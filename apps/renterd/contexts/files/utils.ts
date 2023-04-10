export function getFullPath(dirPathStr: string, name: string) {
  return dirPathStr + name
}

export function getFilename(filePath: string) {
  const parts = filePath.split('/')
  if (filePath.endsWith('/')) {
    return `${parts[parts.length - 2]}/`
  }
  return parts[parts.length - 1]
}

export function isDirectory(path: string) {
  return path.endsWith('/')
}

export function getDirectoryFromPath(path: string) {
  if (isDirectory(path)) {
    return path.slice(1).slice(0, -1).split('/')
  }
  return path.slice(1).split('/').slice(0, -1)
}
