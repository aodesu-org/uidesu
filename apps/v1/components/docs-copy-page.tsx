"use client";

import { Copy } from "lucide-react";



import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/registry/aodesu/ui/button";





export function DocsCopyPage({ page, url }: { page: string; url: string }) {
  const t = useTranslations()
  return (
    <div className="bg-secondary group/buttons relative flex rounded-lg">
      <Button title={t.copyPage} icon>
        <Copy />
      </Button>
    </div>
  )
}
