import path from "path"
import { initOptionsSchema } from "@/src/commands/init"
import * as ERRORS from "@/src/utils/errors"
import { getProjectInfo } from "@/src/utils/get-project-info"
import { highlighter } from "@/src/utils/highlighter"
import { logger } from "@/src/utils/logger"
import { spinner } from "@/src/utils/spinner"
import fs from "fs-extra"
import { z } from "zod"

export async function preflightInit(
  options: z.infer<typeof initOptionsSchema>
) {
  const errors: Record<string, boolean> = {}

  if (
    !fs.existsSync(options.cwd) ||
    !fs.existsSync(path.resolve(options.cwd, "package.json"))
  ) {
    errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT] = true
    return {
      errors,
      ProjectInfo: null,
    }
  }

  const projectSpinner = spinner("Preflight checks.").start()

  if (fs.existsSync(path.resolve(options.cwd, "uidesu.config.json"))) {
    projectSpinner?.fail()
    logger.break()
    logger.error(
      `A ${highlighter.info(
        "uidesu.config.json"
      )} file already exists at ${highlighter.info(
        options.cwd
      )}.\nTo start over, remove the ${highlighter.info(
        "uidesu.config.json"
      )} file and run ${highlighter.info("uidesu init")} again.`
    )
    logger.break()
    process.exit(1)
  }

  projectSpinner?.succeed()

  const frameworkSpinner = spinner("Verifying framework.").start()
  const projectInfo = await getProjectInfo(options.cwd)
  if (!projectInfo || projectInfo?.framework.name === "manual") {
    errors[ERRORS.UNSUPPORTED_FRAMEWORK] = true
    frameworkSpinner?.fail()
    logger.break()

    if (projectInfo?.framework.links.installation) {
      logger.error(
        `We could not detect a supported framework at ${highlighter.info(
          options.cwd
        )}.\n` +
          `Visit ${highlighter.info(
            projectInfo?.framework.links.installation
          )} to manually configure your project.\nOnce configured, you can use the cli to add components.`
      )
    }
    logger.break()
    process.exit(1)
  }
  frameworkSpinner?.succeed(
    `Verifying framework. Found ${highlighter.info(
      projectInfo.framework.label
    )}.`
  )

  return {
    errors,
    projectInfo,
  }
}
