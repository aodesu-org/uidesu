import z from "zod";
import { BUILTIN_REGISTRIES } from "../registry/constants";
import { configSchema } from "../schema";

export type Config = z.infer<typeof configSchema>

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export function createConfig(partial?: DeepPartial<Config>): Config {
  const defaultConfig: Config = {
    resolvedPaths: {
      cwd: process.cwd(),
      tailwindConfig: "",
      tailwindCss: "",
      utils: "",
      components: "",
      ui: "",
      lib: "",
      hooks: "",
    },
    style: "",
    tailwind: {
      config: "",
      css: "",
      baseColor: "",
      cssVariables: false,
    },
    rsc: false,
    tsx: true,
    aliases: {
      components: "",
      utils: "",
    },
    registries: {
      ...BUILTIN_REGISTRIES,
    },
  }

  // Deep merge the partial config with defaults
  if (partial) {
    return {
      ...defaultConfig,
      ...partial,
      resolvedPaths: {
        ...defaultConfig.resolvedPaths,
        ...(partial.resolvedPaths|| {}),
      },
      tailwind: {
        ...defaultConfig.tailwind,
        ...(partial.tailwind || {}),
      },
      aliases: {
        ...defaultConfig.aliases,
        ...(partial.aliases || {}),
      },
      registries: {
        ...defaultConfig.registries,
        ...(partial.registries || {}),
      },
    }
  }

  return defaultConfig;
}
