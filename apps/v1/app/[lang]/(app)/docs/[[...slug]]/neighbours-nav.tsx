"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import { useTranslations } from "@/hooks/use-translations"
import { getLocalizedUrl } from "@/lib/utils"
import { Button } from "@/registry/aodesu/ui/button"

type Neighbour = { url: string; name: string }

type Props = {
  neighbours: {
    previous?: Neighbour | null
    next?: Neighbour | null
  }
  requestedLang: string
}

export function NeighboursNav({ neighbours, requestedLang }: Props) {
  const t = useTranslations()

  if (!neighbours?.previous && !neighbours?.next) return null

  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:justify-between dark:border-gray-800">
      {neighbours.previous && (
        <Button size="small" variant="outlined" asChild>
          <Link href={getLocalizedUrl(neighbours.previous.url, requestedLang)}>
            <ChevronLeft />
            <div className="flex flex-col">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t.navigation.previous}
              </span>
              <span className="font-medium text-[hsl(var(--primary-light))]">
                {neighbours.previous.name}
              </span>
            </div>
          </Link>
        </Button>
      )}
      {neighbours.next && (
        <Button size="small" variant="outlined" asChild>
          <Link href={getLocalizedUrl(neighbours.next.url, requestedLang)}>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t.navigation.next}
              </span>
              <span className="font-medium text-[hsl(var(--primary-light))]">
                {neighbours.next.name}
              </span>
            </div>
            <ChevronRight />
          </Link>
        </Button>
      )}
    </div>
  )
}
