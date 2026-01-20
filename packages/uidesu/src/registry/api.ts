import { fetchRegistry } from "@/src/registry/fetcher"
import { stylesSchema } from "@/src/schema"
import { logger } from "@/src/utils/logger"

export async function getRegistryStyles() {
  try {
    const [result] = await fetchRegistry(["styles/index.json"])

    return stylesSchema.parse(result)
  } catch (error) {
    logger.error("\n")
  }
}

export async function getRegistryThemes() {
  try {
    const [result] = await fetchRegistry(["themes/index.json"])

    return stylesSchema.parse(result)
  } catch (error) {
    logger.error("\n")
  }
}
