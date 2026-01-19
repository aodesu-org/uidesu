import os from "os"
import path from "path"
import { execa } from "execa"
import fs from "fs-extra"

import { spinner } from "../utils/spinner"

const GITHUB_TEMPLATE_URL =
  "https://codeload.github.com/shadcn-ui/ui/tar.gz/main"

export default async function createViteProject(
  projectPath: string,
  options: {
    packageManager: string
  }
) {
  const createSpinner = spinner(
    `Creating a new Vite project. This may take a few minutes.`
  ).start()

  try {
    // Get the template.
    const templatePath = path.join(os.tmpdir(), `shadcn-template-${Date.now()}`)
    await fs.ensureDir(templatePath)
    const response = await fetch(GITHUB_TEMPLATE_URL)
    if (!response.ok) {
      throw new Error(`Failed to download template: ${response.statusText}`)
    }

    // Write the tar file.
    const tarPath = path.resolve(templatePath, "template.tar.gz")
    await fs.writeFile(tarPath, Buffer.from(await response.arrayBuffer()))
    await execa("tar", [
      "-xzf",
      tarPath,
      "-C",
      templatePath,
      "--strip-components=2",
      "ui-main/templates/vite-app",
    ])
    const extractedPath = path.resolve(templatePath, "vite-app")
    await fs.move(extractedPath, projectPath)
    await fs.remove(templatePath)

    // Remove pnpm-lock.yaml if using a different package manager.
    if (options.packageManager !== "pnpm") {
      const lockFilePath = path.join(projectPath, "pnpm-lock.yaml")
      if (fs.existsSync(lockFilePath)) {
        await fs.remove(lockFilePath)
      }
    }

    // Run install.
    await execa(options.packageManager, ["install"], {
      cwd: projectPath,
    })

    // Write project name to the package.json.
    const packageJsonPath = path.join(projectPath, "package.json")
    if (fs.existsSync(packageJsonPath)) {
      const packageJsonContent = await fs.readFile(packageJsonPath, "utf8")
      const packageJson = JSON.parse(packageJsonContent)
      packageJson.name = projectPath.split("/").pop()
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
    }

    // Try git init.
    await execa("git", ["--version"], { cwd: projectPath })
    await execa("git", ["init"], { cwd: projectPath })
    await execa("git", ["add", "-A"], { cwd: projectPath })
    await execa("git", ["commit", "-m", "Initial commit"], {
      cwd: projectPath,
    })

    createSpinner?.succeed("Creating a new Vite project.")
  } catch (error) {
    createSpinner?.fail("Something went wrong creating a new Vite project.")
  }
}
