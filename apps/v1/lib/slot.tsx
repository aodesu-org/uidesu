"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (!React.isValidElement(children)) return null

    return React.cloneElement(children, {
      ...props,
      ref,
      className: cn(className, (children as any).props?.className),
    } as any) as React.ReactElement & { ref: React.Ref<HTMLElement> }
  }
)

Slot.displayName = "Slot"
