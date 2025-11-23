import type { Registry } from "uidesu/schema"

import { baseColorsV4 } from "./base-colors"

export const themes: Registry["items"] = Object.keys(baseColorsV4).map(
  (color) => {
    return {
      name: `theme-${color}`,
      type: "registry:theme",
      cssVars: baseColorsV4[color as keyof typeof baseColorsV4],
    }
  }
)
