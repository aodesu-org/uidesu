import path from "path"
import { preflightInit } from "@/src/preflights/preflight-init"
import { createProject } from "@/src/utils/create-project"
import { loadEnvFiles } from "@/src/utils/env-loader"
import * as ERRORS from "@/src/utils/errors"
import { getProjectInfo } from "@/src/utils/get-project-info"
import { logger } from "@/src/utils/logger"
import { Command } from "commander"
import { z } from "zod"

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
  logger.info("Preflight checks completed.\n")
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
    projectInfo = await getProjectInfo(options.cwd)
  }
}
