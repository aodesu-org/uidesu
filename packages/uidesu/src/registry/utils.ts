export function isUrl(path: string) {
  try {
    new URL(path);
    return true;
  } catch (error) {
    return false;
  }
}

export function isLocalFile(path: string) {
  return path.endsWith(".json") && !isUrl(path);
}
