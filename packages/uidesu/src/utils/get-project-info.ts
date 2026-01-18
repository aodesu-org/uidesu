import path from "path"
import { FRAMEWORKS, Framework } from "@/src/utils/frameworks"
import fg from "fast-glob"
import fs from "fs-extra"
import { loadConfig } from "tsconfig-paths"

export type ProjectInfo = {
  framework: Framework
  isSrcDir: boolean
  aliasPrefix: string | null
}

const PROJECT_SHARED_IGNORE = [
  "**/node_modules/**",
  ".next",
  "public",
  "dist",
  "build",
]

export async function getProjectInfo(cwd: string): Promise<ProjectInfo | null> {
  const [configFiles, isSrcDir, aliasPrefix] = await Promise.all([
    fg.glob(
      "**/{next,vite,astro,app}.config.*|gatsby-config.*|composer.json|react-router.config.*",
      {
        cwd,
        deep: 3,
        ignore: PROJECT_SHARED_IGNORE,
      }
    ),
    fs.pathExists(path.resolve(cwd, "src")),
    getTsConfigAliasPrefix(cwd),
  ])

  const isUsingAppDir = await fs.pathExists(
    path.resolve(cwd, `${isSrcDir ? "src/" : ""}app`)
  )

  const type: ProjectInfo = {
    framework: FRAMEWORKS["manual"],
    isSrcDir,
    aliasPrefix,
  }

  // Next.js.
  if (configFiles.find((file) => file.startsWith("next.config."))?.length) {
    type.framework = isUsingAppDir
      ? FRAMEWORKS["next-app"]
      : FRAMEWORKS["next-pages"]
    return type
  }

  // Vite.
  // Some Remix templates also have a vite.config.* file.
  // We'll assume that it got caught by the Remix check above.
  if (configFiles.find((file) => file.startsWith("vite.config."))?.length) {
    type.framework = FRAMEWORKS["vite"]
    return type
  }

  return type
}

export async function getTsConfigAliasPrefix(cwd: string) {
  const tsConfig = await loadConfig(cwd)

  if (
    tsConfig?.resultType === "failed" ||
    !Object.entries(tsConfig?.paths).length
  ) {
    return null
  }

  // This assume that the first alias is the prefix.
  for (const [alias, paths] of Object.entries(tsConfig.paths)) {
    if (
      paths.includes("./*") ||
      paths.includes("./src/*") ||
      paths.includes("./app/*") ||
      paths.includes("./resources/js/*") // Laravel.
    ) {
      return alias.replace(/\/\*$/, "") ?? null
    }
  }

  // Use the first alias as the prefix.
  return Object.keys(tsConfig?.paths)?.[0].replace(/\/\*$/, "") ?? null
}
