"use client";

import { Locale, translations } from "@/lib/translations";
import { usePathname } from "next/navigation";

const supportedLocales = ['es', 'en'];
const defaultLocale = 'es';

export function useTranslations(): typeof translations[Locale] {
  const pathname = usePathname();

  const locale = pathname.split('/')[1] || defaultLocale;

  const currentLocale = supportedLocales.includes(locale) ? locale : defaultLocale;

  return translations[currentLocale as Locale];
}
