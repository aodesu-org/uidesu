import path from "path"
import { initOptionsSchema } from "@/src/commands/init"
import { getPackageManager } from "@/src/utils/get-package-manager"
import { highlighter } from "@/src/utils/highlighter"
import fs from "fs-extra"
import prompts from "prompts"
import { z } from "zod"

import createViteProject from "../templates/create-vite-project"
import { logger } from "./logger"

export const TEMPLATES = {
  next: "next",
  "next-monorepo": "next-monorepo",
  vite: "vite",
  start: "start",
} as const

export async function createProject(
  options: Pick<z.infer<typeof initOptionsSchema>, "cwd" | "srcDir" | "name">
) {
  options = {
    srcDir: false,
    ...options,
  }

  let template: keyof typeof TEMPLATES = "vite"
  let projectName: string = "my-app"

  const { type, name } = await prompts([
    {
      type: "select",
      name: "type",
      message: `The path ${highlighter.info(
        options.cwd
      )} does not contain a package.json file.\n   Would you like to start a new vite project?`,
      choices: [
        { title: "Yes, create a new vite project", value: "vite" },
        { title: "No, exit and create a project manually", value: "exit" },
      ],
      initial: 0,
    },
    {
      type: options.name ? null : "text",
      name: "name",
      message: "What is your project named?",
      initial: projectName,
      format: (value: string) => value.trim(),
      validate: (value: string) =>
        value.length > 128 ? "Name should be less than 128 characters." : true,
    },
  ])

  template = type ?? template
  projectName = name ?? projectName

  const packageManager = await getPackageManager(options.cwd, {
    withFallback: true,
  })
  const projectPath = `${options.cwd}/${projectName}`

  // Check if path is writable.
  try {
    await fs.access(options.cwd, fs.constants.W_OK)
  } catch (error) {
    logger.break()
    logger.error(`The path ${highlighter.info(options.cwd)} is not writable.`)
    logger.error(
      `It is likely you don't have permissions for this folder or the paths ${highlighter.info(
        options.cwd
      )} does not exist.`
    )
    logger.break()
    process.exit(1)
  }

  if (fs.existsSync(path.resolve(options.cwd, projectName, "package.json"))) {
    logger.break()
    logger.error(
      `A project with the name ${highlighter.info(projectName)} already exists.`
    )
    logger.error(`Please choose a different name and try again.`)
    logger.break()
    process.exit(1)
  }

  await createViteProject(projectPath, {
    packageManager,
  })

  return {
    projectPath,
    projectName,
    template,
  }
}
