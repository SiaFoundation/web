import { trimEnd, trimStart } from '@technically/lodash'

export type FullPathSegments = string[]
export type FullPath = string
export type KeyPath = string

export function join(a: string, b: string): FullPath {
  const _a = trimEnd(a, '/')
  const _b = trimStart(trimStart(b, '.'), '/')
  return `${_a}/${_b}`
}

export function buildDirectoryPath(dirPath: FullPath, name: string): FullPath {
  dirPath = trimStart(dirPath, '/')
  const path = join(dirPath, name)
  return path.endsWith('/') ? path : path + '/'
}

export function getBucketFromPath(path: FullPath): string {
  return path.split('/')[0]
}

export function getKeyFromPath(path: FullPath): KeyPath {
  path = trimStart(path, '/')
  const segsWithoutBucket = path.split('/').slice(1).join('/')
  return `/${segsWithoutBucket}`
}

// the key parameter needs the leading slash removed and parts encoded
export function getKeyParamFromPath(path: FullPath): KeyPath {
  return getKeyFromPath(path)
    .slice(1)
    .split('/')
    .map(encodeURIComponent)
    .join('/')
}

export function bucketAndKeyParamsFromPath(path: FullPath): {
  bucket: string
  key: KeyPath
} {
  return {
    bucket: getBucketFromPath(path),
    key: getKeyParamFromPath(path),
  }
}

export function getFilename(path: FullPath): string {
  path = trimStart(path, '/')
  const parts = path.split('/')
  if (path.endsWith('/')) {
    return `${parts[parts.length - 2]}/`
  }
  return parts[parts.length - 1]
}

export function isDirectory(path: FullPath): boolean {
  return path.endsWith('/')
}

export function getParentDirectoryPath(path: FullPath): FullPath {
  path = trimStart(path, '/')
  const p = isDirectory(path) ? path.slice(0, -1) : path
  return p.split('/').slice(0, -1).join('/').concat('/')
}

export function getDirectorySegmentsFromPath(path: FullPath): FullPathSegments {
  path = trimStart(path, '/')
  if (isDirectory(path)) {
    return path.slice(0, -1).split('/')
  }
  return path.split('/').slice(0, -1)
}

export function pathSegmentsToPath(segments: FullPathSegments): FullPath {
  return segments.join('/')
}

export function ensureDirectory(path: FullPath): FullPath {
  path = trimStart(path, '/')
  if (isDirectory(path)) {
    return path
  }
  return path.concat('/')
}
