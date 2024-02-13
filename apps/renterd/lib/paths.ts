export type FullPathSegments = string[]
export type FullPath = string
export type KeyPath = string

export function join(a: string, b: string): FullPath {
  const _a = a.endsWith('/') ? a.slice(0, -1) : a
  const _b = b.startsWith('/') ? b.slice(1) : b
  return `${_a}/${_b}`
}

export function buildDirectoryPath(dirPath: FullPath, name: string): FullPath {
  const path = join(dirPath, name)
  return path.endsWith('/') ? path : path + '/'
}

export function getBucketFromPath(path: FullPath): string {
  return path.split('/')[0]
}

export function getKeyFromPath(path: FullPath): KeyPath {
  const segsWithoutBucket = path.split('/').slice(1).join('/')
  return `/${segsWithoutBucket}`
}

// key is the path to the file or directory with a leading slash
export function bucketAndKeyParamsFromPath(path: FullPath): {
  bucket: string
  key: KeyPath
} {
  return {
    bucket: getBucketFromPath(path),
    key: getKeyFromPath(path)
      .slice(1)
      .split('/')
      .map(encodeURIComponent)
      .join('/'),
  }
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

export function getParentDirectoryPath(path: FullPath): FullPath {
  const p = isDirectory(path) ? path.slice(0, -1) : path
  return p.split('/').slice(0, -1).join('/').concat('/')
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

export function ensureDirectory(path: FullPath): FullPath {
  if (isDirectory(path)) {
    return path
  }
  return path.concat('/')
}
