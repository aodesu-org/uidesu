// components/LanguageSwitcher.tsx
'use client'; // Esto lo hace un Client Component, ya que usa hooks como useRouter

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const supportedLocales = ['es', 'en'];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = supportedLocales.find(locale => pathname.startsWith(`/${locale}`)) || 'es';
  const [selectedLocale, setSelectedLocale] = useState(currentLocale);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    setSelectedLocale(newLocale);

    // Extraer la ruta actual sin el prefijo de locale
    const currentPathWithoutLocale = supportedLocales.reduce(
      (path, locale) => path.replace(`/${locale}`, ''),
      pathname
    );

    // Construir la nueva URL con el nuevo locale
    const newPath = `/${newLocale}${currentPathWithoutLocale}`;

    // Redirigir a la nueva ruta
    router.push(newPath);
  };

  return (
    <div>
      <label htmlFor="language-select">Cambiar idioma: </label>
      <select id="language-select" value={selectedLocale} onChange={handleChange}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
