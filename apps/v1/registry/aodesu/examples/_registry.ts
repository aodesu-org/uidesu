import { Registry } from "uidesu/schema"

export const examples: Registry["items"] = [
  {
    name: "avatar-demo",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/avatar/avatar-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-demo",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-contained",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-contained.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-outlined",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-outlined.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-ghost",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-ghost.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-text",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-text.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-colors",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-colors.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-sizes",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-sizes.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-with-icon",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-with-icon.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-icon",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-icon.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-disabled",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "button-loading",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button/button-loading.tsx",
        type: "registry:example",
      },
    ],
  },
]
