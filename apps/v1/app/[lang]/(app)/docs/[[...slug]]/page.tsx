import { DocsCopyPage } from "@/components/docs-copy-page";
import { source } from "@/lib/source";
import { absoluteUrl } from "@/lib/utils";
import fm from "front-matter";
import { findNeighbour } from "fumadocs-core/page-tree";
import { notFound } from "next/navigation";
import z from "zod";

export function generateStaticParams() {
  return source.generateParams();
}

export default async function Page(props: {
  params: Promise<{ slug?: string[], lang: string }>
}) {
  const { slug, lang } = await props.params;

  console.log("Params:", { slug, lang });
  console.log("Available languages:", Object.keys(source.pageTree));

  const page = source.getPage(slug, lang);
  console.log("Found page:", page);

  if (!page) {
    console.log("Page not found for:", { slug, lang });
    notFound();
  }

  const doc = page.data;
  const MDX = doc.body;
  const localizedTree = source.pageTree[lang];
  const neighbours = findNeighbour(localizedTree, page.url);

  console.log(source)
  console.log(neighbours)

  const raw = await page.data.getText("raw");
  const { attributes } = fm(raw);
  const { links } = z
    .object({
      links: z
        .object({
          doc: z.string().optional(),
          api: z.string().optional(),
        })
        .optional(),
    })
    .parse(attributes);

  return (
    <div className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-100">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                  {doc.title}
                </h1>
                <div>
                  <DocsCopyPage page={raw} url={absoluteUrl(page.url)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
