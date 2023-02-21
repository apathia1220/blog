export const isRoutePath = (path: string): boolean => {
  return path.startsWith('http://') || path.startsWith('https:') || path.startsWith('file://')
}
