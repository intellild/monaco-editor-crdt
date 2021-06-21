export function normalizeEOL(buffer: string) {
  return buffer.replace(/(\r\n|\r)/g, "\n");
}
