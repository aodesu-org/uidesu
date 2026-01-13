import { registryItemSchema, type Registry } from "uidesu/schema"
import z from "zod"

import { themes } from "../themes"
import { examples } from "./examples/_registry"
import { ui } from "./ui/_registry"

const DEPRECATED_ITEMS: string | string[] = []

const AODESU_STYLE = {
  type: "registry:style",
  dependencies: ["class-variance-authority", "lucide-react"],
  devDependencies: ["tw-animate-css"],
  registryDependencies: ["utils"],
  cssVars: {},
  files: [],
}

export const registry = {
  name: "aodesu",
  homepage: "https://ui.aodesu.com/",
  items: z.array(registryItemSchema).parse(
    [
      {
        name: "index",
        ...AODESU_STYLE,
      },
      {
        name: "style",
        ...AODESU_STYLE,
      },
      {
        name: "utils",
        type: "registry:lib",
        files: [
          {
            path: "lib/utils.ts",
            type: "registry:lib",
          },
          {
            path: "lib/slot.tsx",
            type: "registry:lib",
          },
        ],
      },
      ...ui,
      ...examples,
      ...themes,
    ]
      .filter((item) => {
        return !DEPRECATED_ITEMS.includes(item.name)
      })
      .map((item) => {
        return item
      })
  ),
} satisfies Registry
