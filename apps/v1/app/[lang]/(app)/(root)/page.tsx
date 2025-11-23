import { DynamicLink } from "fumadocs-core/dynamic-link"

import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header"

const title = "The foundation for your Design System"

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <PageHeaderHeading className="max-w-4xl">{title}</PageHeaderHeading>
      </PageHeader>
      <PageActions>
        <DynamicLink href="/[lang]/components">View Components</DynamicLink>
      </PageActions>
    </div>
  )
}
