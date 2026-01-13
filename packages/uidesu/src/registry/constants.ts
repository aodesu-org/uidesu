import z from "zod";
import { registryConfigSchema } from "./schema";

export const REGISTRY_URL =
  process.env.REGISTRY_URL ?? "https://ui.aodesu.com/r";

export const FALLBACK_STYLE = "aodesu";

export const BASE_COLORS = [
  {
    name: "neutral",
    label: "Neutral"
  }
]

export const BUILTIN_REGISTRIES: z.infer<typeof registryConfigSchema> = {
  "@uidesu": `${REGISTRY_URL}/styles/{style}/{name}.json`,
}


export const DEPRECATED_COMPONENTS = [
  {
    name: "toast",
    deprecatedBy: "sonner",
    message:
      "The toast component is deprecated. Use the sonner component instead.",
  },
  {
    name: "toaster",
    deprecatedBy: "sonner",
    message:
      "The toaster component is deprecated. Use the sonner component instead.",
  },
]
