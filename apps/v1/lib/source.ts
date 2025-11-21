import { docs } from "@/.source"
import { loader } from "fumadocs-core/source"
import { i18n } from "./i18n"

export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  i18n
})

// Add debugging
console.log("Source languages:", Object.keys(source.pageTree))
console.log("Spanish pages:", source.pageTree.es?.children?.map(c => c.name))
console.log("English pages:", source.pageTree.en?.children?.map(c => c.name))
