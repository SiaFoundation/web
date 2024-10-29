import {
  FullPathSegments,
  getBucketFromPath,
  getFilename,
  getKeyFromPath,
  pathSegmentsToPath,
  join,
  FullPath,
  getParentDirectoryPath,
  isDirectory,
  ensureDirectory,
} from './paths'

type Id = string | number

export function getMoveFileDestinationDirectory(
  activeDirectory: FullPathSegments,
  e?: { collisions: { id: Id }[] | null }
) {
  let toPath = pathSegmentsToPath(activeDirectory)
  if (e?.collisions?.length) {
    if (e.collisions[0].id === '..') {
      toPath = pathSegmentsToPath(activeDirectory.slice(0, -1))
    } else {
      toPath = String(e.collisions[0].id)
    }
  }
  return toPath
}

export function getMoveFileOperations(
  paths: FullPath[],
  destinationPath: FullPath
) {
  const list: {
    bucket: string
    from: string
    to: string
    mode: 'multi' | 'single'
  }[] = []

  // Generate initial list with paths mapped to their rename parameters
  for (const fromPath of paths) {
    const filename = getFilename(fromPath)
    const bucket = getBucketFromPath(fromPath)
    const from = getKeyFromPath(fromPath)
    const to = getKeyFromPath(join(destinationPath, filename))
    if (from === to) {
      continue
    }
    list.push({
      bucket,
      from,
      to,
      mode: filename.endsWith('/') ? 'multi' : 'single',
    })
  }

  // Sort list by most specific file or directory first.
  // So that specific files are moved directly into the destination
  // before their parent directory is moved with all its contents.
  list.sort((a, b) => {
    if (a.from === b.from) {
      return 0
    }
    return a.from.startsWith(b.from) ? -1 : 1
  })

  return list
}

// Parameters for renaming the name of a file or directory.
export function getRenameFileRenameParams(path: FullPath, newName: string) {
  let to = join(getParentDirectoryPath(path), newName)
  const isDir = isDirectory(path)
  // handle renaming directories
  if (isDir) {
    to = ensureDirectory(to)
  }
  return {
    bucket: getBucketFromPath(path),
    from: getKeyFromPath(path),
    to: getKeyFromPath(to),
    mode: isDir ? 'multi' : 'single',
  } as const
}
