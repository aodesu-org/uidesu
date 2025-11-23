"use client"

import { useTranslations } from "@/hooks/use-translations"

export function DocsCopyPage({ page, url }: { page: string; url: string }) {
  const t = useTranslations()
  return (
    <div className="bg-secondary group/buttons relative flex rounded-lg">
      <button>{t.copyPage}</button>
    </div>
  )
}
