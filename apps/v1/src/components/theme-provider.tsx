"use client"

import { useThemeConfig } from "@/hooks/use-theme-config"
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react"

type Theme = string

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme: overrideDefaultTheme,
  availableThemes: overrideAvailableThemes,
  storageKey = "ui-theme",
  stylePath: overrideStylePath,
}: {
  children: React.ReactNode
  defaultTheme?: Theme
  availableThemes?: Theme[]
  storageKey?: string
  stylePath?: string
}) {
  const config = useThemeConfig()

  // Use config values, fallback to overrides, then to defaults
  const defaultTheme = overrideDefaultTheme || config?.defaultTheme || "light"
  const availableThemes = overrideAvailableThemes || config?.themes || ["light", "dark"]
  const stylePath = overrideStylePath || config?.stylePath || "/styles/aodesu"

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme

    const stored = localStorage.getItem(storageKey) as Theme | null
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    return stored || (availableThemes.includes(system) ? system : defaultTheme)
  })

  const applyTheme = (theme: Theme, stylePath: string) => {
    const root = document.documentElement

    // Remove all theme classes
    availableThemes.forEach((t) => {
      root.classList.remove(t)
    })

    // Add the new theme class
    root.classList.add(theme)

    // Import the appropriate theme CSS
    const link = document.getElementById("theme-style") as HTMLLinkElement
    if (link) {
      link.href = `${stylePath}/${theme}.css`
    } else {
      const newLink = document.createElement("link")
      newLink.id = "theme-style"
      newLink.rel = "stylesheet"
      newLink.href = `${stylePath}/${theme}.css`
      document.head.appendChild(newLink)
    }
  }

  useLayoutEffect(() => {
    applyTheme(theme, stylePath)
  }, [theme, stylePath, availableThemes])

  const setTheme = (newTheme: Theme) => {
    if (!availableThemes.includes(newTheme)) {
      console.warn(
        `Theme "${newTheme}" is not in availableThemes: ${availableThemes.join(", ")}`
      )
      return
    }

    setThemeState(newTheme)
    localStorage.setItem(storageKey, newTheme)
    applyTheme(newTheme, stylePath)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
