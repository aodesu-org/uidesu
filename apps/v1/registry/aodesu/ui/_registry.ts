import { Registry } from "uidesu/schema"

export const ui: Registry["items"] = [
  {
    name: "avatar",
    type: "registry:ui",
    files: [
      {
        path: "ui/avatar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button",
    type: "registry:ui",
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui",
      },
    ],
  }
]
