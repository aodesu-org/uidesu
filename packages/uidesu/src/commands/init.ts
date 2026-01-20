import path from "path"
import { preflightInit } from "@/src/preflights/preflight-init"
import { getRegistryStyles, getRegistryThemes } from "@/src/registry/api"
import { rawConfigSchema } from "@/src/schema"
import { createProject } from "@/src/utils/create-project"
import { loadEnvFiles } from "@/src/utils/env-loader"
import * as ERRORS from "@/src/utils/errors"
import { Config, getConfig, resolveConfigPaths } from "@/src/utils/get-config"
import { getProjectConfig, getProjectInfo } from "@/src/utils/get-project-info"
import { logger } from "@/src/utils/logger"
import { Command } from "commander"
import prompts from "prompts"
import { z } from "zod"

import { highlighter } from "../utils/highlighter"

process.on("exit", (code) => {
  const filePath = path.resolve(process.cwd(), "uidesu.config.json")

  if (code === 0) {
    logger.info(`✓ uidesu initialized successfully!`)
  }
  logger.info(`Configuration file created at:\n${filePath}`)
})

export const initOptionsSchema = z.object({
  cwd: z.string(),
  name: z.string().optional(),
  yes: z.boolean(),
  srcDir: z.boolean().optional(),
})

export const init = new Command()
  .name("init")
  .description("initialize a uidesu in your project.")
  .option("-y, --yes", "skip prompts and use default values", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .option(
    "--src-dir",
    "use the src directory when creating a new project.",
    false
  )
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse({
        cwd: path.resolve(opts.cwd),
        ...opts,
      })

      await loadEnvFiles(options.cwd)

      await runInit(options)

      logger.success(`Initialized uidesu in directory: ${opts.cwd}`)
      logger.break()
    } catch (error) {
      logger.break()
    }
  })

export async function runInit(
  options: z.infer<typeof initOptionsSchema> & {
    skipPreflight?: boolean
  }
) {
  let projectInfo
  let newProjectTemplate
  const preflight = await preflightInit(options)
  if (preflight.errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT]) {
    const { projectPath, template } = await createProject(options)
    if (!projectPath) {
      process.exit(1)
    }
    options.cwd = projectPath
    newProjectTemplate = template
    // Re-get project info for the newly created project.
    projectInfo = await getProjectInfo(options.cwd)
  } else {
    projectInfo = preflight.projectInfo
  }

  const projectConfig = await getProjectConfig(options.cwd, projectInfo)

  console.log(projectConfig)

  let config = projectConfig
    ? await promptForMinimalConfig(projectConfig, options)
    : await promptForConfig(await getConfig(options.cwd))

  if (!options.yes) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Write configuration to ${highlighter.info(
        "uidesu.config.json"
      )}. Proceed?`,
      initial: true,
    })

    if (!proceed) {
      process.exit(0)
    }
  }

  const fullConfigForRegistry = await resolveConfigPaths(options.cwd, config)
}

async function promptForConfig(defaultConfig: Config | null = null) {
  const [styles, themes] = await Promise.all([
    getRegistryStyles(),
    getRegistryThemes(),
  ])

  logger.info("")
  const options = await prompts([
    {
      type: "toggle",
      name: "typescript",
      message: `Would you like to use ${highlighter.info(
        "TypeScript"
      )} (recommended)?`,
      initial: defaultConfig?.tsx ?? true,
      active: "yes",
      inactive: "no",
    },
  ])

  return rawConfigSchema.parse({
    $schema: "https://ui.aodesu.com/schema.json",
    tsx: options.typescript,
  })
}

async function promptForMinimalConfig(
  defaultConfig: Config,
  opts: z.infer<typeof initOptionsSchema>
) {
  let style = defaultConfig.style
  let theme = defaultConfig.tailwind.theme
  let cssVariables = defaultConfig.tailwind.cssVariables

  return rawConfigSchema.parse({
    $schema: defaultConfig?.$schema,
    style,
    tailwind: {
      ...defaultConfig?.tailwind,
      theme,
      cssVariables,
    },
    tsx: defaultConfig?.tsx,
    aliases: defaultConfig?.aliases,
  })
}
