export async function fetchRegistry(
  paths: string[],
  options: { useCache?: boolean } = {}
) {
  options = {
    useCache: true,
    ...options,
  }

  try {
    const results = await Promise.all(paths.map(async (path) => {}))

    return results
  } catch (error) {
    throw error
  }
}
