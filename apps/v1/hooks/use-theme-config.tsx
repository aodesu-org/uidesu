"use client"

import { useEffect, useState } from "react"

interface ThemeConfig {
  themes: string[]
  defaultTheme: string
  stylePath: string
}

export function useThemeConfig(): ThemeConfig | null {
  const [config, setConfig] = useState<ThemeConfig | null>(null)

  useEffect(() => {
    // Load config from components.json
    fetch("/components.json")
      .then((res) => res.json())
      .then((data) => {
        setConfig({
          themes: data.themes || ["light", "dark"],
          defaultTheme: data.defaultTheme || "light",
          stylePath: "/styles/aodesu",
        })
      })
      .catch((err) => {
        console.warn("Failed to load theme config from components.json:", err)
        // Fallback to defaults
        setConfig({
          themes: ["light", "dark"],
          defaultTheme: "light",
          stylePath: "/styles/aodesu",
        })
      })
  }, [])

  return config
}
