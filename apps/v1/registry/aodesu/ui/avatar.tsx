"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

function getInitials(name: string | undefined | null): string {
  if (!name || typeof name !== "string") return "??"

  const cleanedName = name.trim()
  if (cleanedName.length === 0) return "??"

  const nameParts = cleanedName.split(/\s+/).filter((part) => part.length > 0)

  if (nameParts.length === 0) return "??"

  if (nameParts.length === 1) {
    return cleanedName.slice(0, 2).toUpperCase()
  }

  return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
}

export default function Avatar({
  containerClassName,
  imageClassName,
  fallbackClassName,
  alt,
  src,
}: {
  containerClassName?: string
  imageClassName?: string
  fallbackClassName?: string
  alt?: string
  src?: string
}) {
  return (
    <AvatarContainer className={containerClassName}>
      <AvatarImage src={src} alt={alt} className={imageClassName} />
      <AvatarFallback className={fallbackClassName}>
        {getInitials(alt)}
      </AvatarFallback>
    </AvatarContainer>
  )
}

function AvatarContainer({ className, ...props }: AvatarProps) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

function AvatarImage({
  className,
  onLoad,
  onError,
  ...props
}: AvatarImageProps) {
  const [hasError, setHasError] = React.useState(false)
  const { alt } = props

  // Reset error state when src changes
  React.useEffect(() => {
    setHasError(false)
  }, [props.src])

  if (hasError) {
    return null
  }

  return (
    <img
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      alt={alt ?? ""}
      onLoad={onLoad}
      onError={(e) => {
        setHasError(true)
        onError?.(e)
      }}
      {...props}
    />
  )
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  delayMs?: number
}

function AvatarFallback({
  className,
  delayMs = 0,
  children,
  ...props
}: AvatarFallbackProps) {
  const [isVisible, setIsVisible] = React.useState(delayMs === 0)

  React.useEffect(() => {
    if (delayMs > 0) {
      const timer = setTimeout(() => setIsVisible(true), delayMs)
      return () => clearTimeout(timer)
    }
  }, [delayMs])

  if (!isVisible) {
    return null
  }

  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { AvatarContainer, AvatarFallback, AvatarImage }
