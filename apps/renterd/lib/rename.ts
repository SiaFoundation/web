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

// Parameters for moving a directory or file to drag destination.
export function getMoveFileRenameParams(
  e: { active: { id: Id }; collisions: { id: Id }[] | null },
  activeDirectory: FullPathSegments
) {
  const fromPath = String(e.active.id)
  let toPath = pathSegmentsToPath(activeDirectory)
  if (e.collisions?.length) {
    if (e.collisions[0].id === '..') {
      toPath = pathSegmentsToPath(activeDirectory.slice(0, -1))
    } else {
      toPath = String(e.collisions[0].id)
    }
  }
  const filename = getFilename(fromPath)
  const bucket = getBucketFromPath(fromPath)
  const from = getKeyFromPath(fromPath)
  const to = getKeyFromPath(join(toPath, filename))
  return {
    bucket,
    from,
    to,
    mode: filename.endsWith('/') ? 'multi' : 'single',
  } as const
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
