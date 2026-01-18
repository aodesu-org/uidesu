import path from "path"
import { preflightInit } from "@/src/preflights/preflight-init"
import { loadEnvFiles } from "@/src/utils/env-loader"
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
  yes: z.boolean(),
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
  const preflight = await preflightInit(options)
}
