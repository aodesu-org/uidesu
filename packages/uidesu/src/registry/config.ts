import deepmerge from "deepmerge";
import { Config, createConfig } from "../utils/get-config";
import { BUILTIN_REGISTRIES, FALLBACK_STYLE } from "./constants";
import { configSchema } from "./schema";

function resolveStyleFromConfig(config: Partial<Config> | Config) {
  if (!config.style) {
    return FALLBACK_STYLE;
  }

  // Check if we should use aodesu for tailwind
  // We assume that if tailwind.config is empty, we're using tailwind v4.
  if (config.style === "aodesu" && config.tailwind?.config === "") {
    return FALLBACK_STYLE;
  }

  return config.style;
}

export function configWithDefaults(config?: Partial<Config> | Config) {
  const baseConfig = createConfig({
    style: FALLBACK_STYLE,
    registries: BUILTIN_REGISTRIES,
  });

  if (!config) {
    return baseConfig;
  }

  return configSchema.parse(
    deepmerge(baseConfig, {
      ...config,
      style: resolveStyleFromConfig(config),
      registries: { ...BUILTIN_REGISTRIES, ...config.registries },
    })
  )
};
