import React from "react";


export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const { lang } = await params;
  return (
      <div className="container-wrapper flex flex-1 flex-col px-2">
        {children}
      </div>
  )
}
