import React from "react";



import { Index } from "@/registry/__index__";
import { Style } from "@/registry/styles";



import { ComponentPreviewTabs } from "./component-preview-tabs";
import { ComponentSource } from "./component-source";


export function ComponentPreview({
  name,
  styleName = "aodesu",
  type,
  className,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  styleName?: Style["name"]
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
  chromeLessOnMobile?: boolean
}) {
  const Component = Index[styleName]?.[name]?.component;

  if (!Component) {
    return (
      <p className="text-muted-foreground mt-6 text-sm">
        Componente{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        no encontrado en el registry.
      </p>
    )
  }

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-1">
        <div className="bg-background absolute inset-0 hidden w-[1600px] md:block">
          <iframe src={`/view/${styleName}/${name}`} className="size-full" />
        </div>
      </div>
    )
  }

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      component={<Component />}
      source={
        <ComponentSource
          name={name}
          collapsible={false}
          styleName={styleName}
        />
      }
      chromeLessOnMobile={chromeLessOnMobile}
      {...props}
    />
  )
}
