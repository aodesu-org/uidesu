"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ---------------------------------------------
   Tipos
--------------------------------------------- */

type ButtonVariant = "ghost" | "contained" | "outlined" | "text"
type ButtonColor = "neutral" | "primary" | "secondary" | "contrast"
type ButtonSize = "small" | "medium" | "big"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  icon?: boolean
}

/* ---------------------------------------------
   Clases base
--------------------------------------------- */

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium shrink-0 outline-none transition-transform transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:text-[1.5em] [&_svg]:w-[1em] [&_svg]:h-[1em]"

/* ---------------------------------------------
   Sizes
--------------------------------------------- */

const sizeClasses: Record<ButtonSize, string> = {
  small: "h-7 rounded-md px-3 py-1.5 [&_svg]:size-4",
  medium: "h-9 rounded-lg px-4 py-2 [&_svg]:size-5",
  big: "h-10 rounded-xl px-6 py-3 [&_svg]:size-5",
}

const iconSizeClasses: Record<ButtonSize, string> = {
  small: "size-8 rounded-md p-2",
  medium: "size-10 rounded-lg p-0",
  big: "size-12 rounded-xl p-0",
}

/* ---------------------------------------------
   Variants base
--------------------------------------------- */

const variantBaseClasses: Record<ButtonVariant, string> = {
  ghost: "",
  contained: "",
  outlined: "border border-[hsl(var(--neutral-dark))]",
  text: "!py-0 !px-0.5 !text-[1em] leading-none !h-lh !rounded-full ring-4 ring-transparent",
}

/* ---------------------------------------------
   Colores por variante
--------------------------------------------- */

const variantColorMap = {
  ghost: {
    neutral:
      "hover:bg-[hsl(var(--neutral-dark))] active:bg-[hsl(var(--neutral))]",
    primary:
      "text-[hsl(var(--primary-light))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] active:bg-[hsl(var(--primary-light))]",
    secondary:
      "text-[hsl(var(--secondary-light))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary-foreground))] active:bg-[hsl(var(--secondary-light))]",
    contrast:
      "hover:bg-[hsl(var(--contrast-light))] hover:text-[hsl(var(--inverse-foreground))] active:bg-[hsl(var(--contrast))]",
  },
  contained: {
    neutral:
      "bg-[hsl(var(--neutral-dark))] hover:bg-[hsl(var(--neutral))] active:bg-[hsl(var(--neutral-light))]",
    primary:
      "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-dark))] active:bg-[hsl(var(--primary-light))]",
    secondary:
      "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary-dark))] active:bg-[hsl(var(--secondary-light))]",
    contrast:
      "text-[hsl(var(--inverse-foreground))] bg-[hsl(var(--contrast-light))] hover:bg-[hsl(var(--contrast))] active:bg-[hsl(var(--contrast-dark))]",
  },
  outlined: {
    neutral:
      "border-[hsl(var(--neutral-dark))] hover:bg-[hsl(var(--neutral-dark))] active:bg-[hsl(var(--neutral))]",
    primary:
      "text-[hsl(var(--primary-light))] border-[hsl(var(--primary-dark))] hover:bg-[hsl(var(--primary-dark))] hover:text-[hsl(var(--primary-foreground))]",
    secondary:
      "text-[hsl(var(--secondary-light))] border-[hsl(var(--secondary-dark))] hover:bg-[hsl(var(--secondary-dark))] hover:text-[hsl(var(--secondary-foreground))]",
    contrast:
      "border-[hsl(var(--foreground)/.7)] hover:bg-[hsl(var(--neutral-dark))]",
  },
  text: {
    neutral:
      "text-[hsl(var(--foreground-light))] hover:bg-[hsl(var(--neutral-dark))]",
    primary:
      "text-[hsl(var(--primary-light))] hover:bg-[hsl(var(--primary-light)/.15)]",
    secondary:
      "text-[hsl(var(--secondary-light))] hover:bg-[hsl(var(--secondary-light)/.15)]",
    contrast:
      "text-[hsl(var(--primary-light))] hover:bg-[hsl(var(--primary-light)/.15)]",
  },
} as const

/* ---------------------------------------------
   Active behaviors
--------------------------------------------- */

const activeIconClasses = "active:[&_svg]:scale-90"
const activeNormalClasses = "active:opacity-70"

/* ---------------------------------------------
   Button
--------------------------------------------- */

export function Button({
  className,
  variant = "ghost",
  color = "neutral",
  size = "medium",
  icon,
  children,
  ...props
}: ButtonProps) {
  const isIconButton =
    icon ??
    (React.Children.count(children) === 1 &&
      React.isValidElement(children) &&
      children.type === "svg")

  return (
    <button
      data-slot="button"
      className={cn(
        baseClasses,
        variantBaseClasses[variant],
        variantColorMap[variant][color],
        isIconButton ? iconSizeClasses[size] : sizeClasses[size],
        isIconButton ? activeIconClasses : activeNormalClasses,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
