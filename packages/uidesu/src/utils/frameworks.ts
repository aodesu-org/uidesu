export const FRAMEWORKS = {
  "next-app": {
    name: "next-app",
    label: "Next.js",
    links: {
      installation: "https://ui.uidesu.com/docs/installation/next",
      tailwind: "https://tailwindcss.com/docs/guides/nextjs",
    },
  },
  "next-pages": {
    name: "next-pages",
    label: "Next.js",
    links: {
      installation: "https://ui.uidesu.com/docs/installation/next",
      tailwind: "https://tailwindcss.com/docs/guides/nextjs",
    },
  },
  vite: {
    name: "vite",
    label: "Vite",
    links: {
      installation: "https://ui.uidesu.com/docs/installation/vite",
      tailwind: "https://tailwindcss.com/docs/guides/vite",
    },
  },
  manual: {
    name: "manual",
    label: "Manual",
    links: {
      installation: "https://ui.uidesu.com/docs/installation/manual",
      tailwind: "https://tailwindcss.com/docs/installation",
    },
  },
}

export type Framework = (typeof FRAMEWORKS)[keyof typeof FRAMEWORKS]
