import { registryConfigSchema } from "@/src/schema"
import { z } from "zod"

export const REGISTRY_URL =
  process.env.REGISTRY_URL ?? "https://ui.aodesu.com/r"

// Built-in registries that are always available and cannot be overridden
export const BUILTIN_REGISTRIES: z.infer<typeof registryConfigSchema> = {
  "@shadcn": `${REGISTRY_URL}/styles/{style}/{name}.json`,
}
