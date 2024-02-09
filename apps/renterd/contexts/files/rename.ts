import {
  FullPathSegments,
  getBucketFromPath,
  getFilename,
  getKeyFromPath,
  pathSegmentsToPath,
  join,
} from './paths'

type Id = string | number

export function getRenameParams(
  e: { active: { id: Id }; collisions: { id: Id }[] },
  activeDirectory: FullPathSegments
) {
  const fromPath = String(e.active.id)
  let toPath = pathSegmentsToPath(activeDirectory)
  if (e.collisions.length) {
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
