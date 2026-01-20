import path from "path"
import { configSchema, rawConfigSchema } from "@/src/schema"
import { highlighter } from "@/src/utils/highlighter"
import { resolveImport } from "@/src/utils/resolve-import"
import { cosmiconfig } from "cosmiconfig"
import { loadConfig } from "tsconfig-paths"
import { z } from "zod"

import { BUILTIN_REGISTRIES } from "../registry/constants"

export const explorer = cosmiconfig("uidesu", {
  searchPlaces: ["uidesu.config.json"],
})

export type Config = z.infer<typeof configSchema>

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(
  cwd: string,
  config: z.infer<typeof rawConfigSchema>
) {
  // Merge built-in registries with user registries
  config.registries = {
    ...BUILTIN_REGISTRIES,
    ...(config.registries || {}),
  }

  // Read tsconfig.json.
  const tsConfig = await loadConfig(cwd)
  console.log("aki1")
  if (tsConfig.resultType === "failed") {
    throw new Error(
      `Failed to load ${config.tsx ? "tsconfig" : "jsconfig"}.json. ${
        tsConfig.message ?? ""
      }`.trim()
    )
  }

  const test = configSchema.parse({
    ...config,
    resolvedPaths: {
      cwd,
      tailwindConfig: config.tailwind.config
        ? path.resolve(cwd, config.tailwind.config)
        : "",
      utils: await resolveImport(config.aliases["utils"], tsConfig),
      components: await resolveImport(config.aliases["components"], tsConfig),
      ui: config.aliases["ui"]
        ? await resolveImport(config.aliases["ui"], tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases["components"], tsConfig)) ??
              cwd,
            "ui"
          ),
      lib: config.aliases["lib"]
        ? await resolveImport(config.aliases["lib"], tsConfig)
        : path.resolve(
            (await resolveImport(config.aliases["utils"], tsConfig)) ?? cwd,
            ".."
          ),
    },
  })

  console.log(test)

  return test
}

export async function getRawConfig(
  cwd: string
): Promise<z.infer<typeof rawConfigSchema> | null> {
  try {
    const configResult = await explorer.search(cwd)

    if (!configResult) return null

    const config = rawConfigSchema.parse(configResult.config)

    // Check if user is trying to override built-in registries
    if (config.registries) {
      for (const registryName of Object.keys(config.registries)) {
        if (registryName in BUILTIN_REGISTRIES) {
          throw new Error(
            `"${registryName}" is a built-in registry and cannot be overridden.`
          )
        }
      }
    }

    return config
  } catch (error) {
    const configPath = `${cwd}/uidesu.config.json`
    if (error instanceof Error && error.message.includes("reserved registry")) {
      throw error
    }
    throw new Error(
      `Invalid configuration found in ${highlighter.info(configPath)}.`
    )
  }
}
