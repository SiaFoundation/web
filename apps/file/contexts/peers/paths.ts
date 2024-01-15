export type FullPathSegments = string[]
export type FullPath = string
export type KeyPath = string

export function getFilePath(dirPath: FullPath, name: string): FullPath {
  const n = name.startsWith('/') ? name.slice(1) : name
  return dirPath + n
}

export function getDirPath(dirPath: FullPath, name: string): FullPath {
  const path = getFilePath(dirPath, name)
  return path.endsWith('/') ? path : path + '/'
}

export function getFilename(filePath: FullPath): string {
  const parts = filePath.split('/')
  if (filePath.endsWith('/')) {
    return `${parts[parts.length - 2]}/`
  }
  return parts[parts.length - 1]
}

export function isDirectory(path: FullPath): boolean {
  return path.endsWith('/')
}

export function getDirectorySegmentsFromPath(path: FullPath): FullPathSegments {
  if (isDirectory(path)) {
    return path.slice(0, -1).split('/')
  }
  return path.split('/').slice(0, -1)
}

export function pathSegmentsToPath(segments: FullPathSegments): FullPath {
  return segments.join('/')
}
