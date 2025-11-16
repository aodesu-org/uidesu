// Internal function that fetches registry items without clearing context.

import { Config } from "../utils/get-config";
import { buildUrlAndHeadersForRegistryItem } from "./builder";
import { setRegistryHeaders } from "./context";
import { RegistryParseError } from "./errors";
import { fetchRegistry, fetchRegistryLocal } from "./fetcher";
import { registryItemSchema } from "./schema";
import { isLocalFile, isUrl } from "./utils";

export function resolveRegistryItemsFromRegistries(
  items: string[],
  config: Config
) {
  const registryHeaders: Record<string, Record<string, string>> = {};
  const resolvedItems = [...items];

  if (!config?.registries) {
    setRegistryHeaders({});
    return resolvedItems;
  }

  for (let i = 0; i < resolvedItems.length; i++) {
    const resolved = buildUrlAndHeadersForRegistryItem(resolvedItems[i], config);

    if (resolved) {
      resolvedItems[i] = resolved.url;

      if (Object.keys(resolved.headers).length > 0) {
        registryHeaders[resolved.url] = resolved.headers;
      }
    }
  }

  setRegistryHeaders(registryHeaders);

  return resolvedItems;
}

// This is used for recursive dependecy resolution.
export async function fetchRegistryItems(
  items: string[],
  config: Config,
  options: { useCache?: boolean } = {}
) {
  const results = await Promise.all(
    items.map(async (item) => {
      if (isLocalFile(item)) {
        return fetchRegistryLocal(item);
      }

      if (isUrl(item)) {
        const [result] = await fetchRegistry([item], options);
        try {
          return registryItemSchema.parse(result);
        } catch (error) {
          throw new RegistryParseError(item, error);
        }
      }

      if (item.startsWith("@") && config?.registries) {
        const paths = resolveRegistryItemsFromRegistries([item], config);
        const [result] = await fetchRegistry(paths, options);
        try {
          return registryItemSchema.parse(result);
        } catch (error) {
          throw new RegistryParseError(item, error);
        }
      }


      const path = `styles/${config?.style ?? "aodesu"}/${item}.json`;
      const [result] = await fetchRegistry([path], options);
        console.log("TEST - LLEGO AKI")
      try {
        return registryItemSchema.parse(result);
      } catch (error) {
        throw new RegistryParseError(item, error);
      }
    })
  )

  return results;
}
