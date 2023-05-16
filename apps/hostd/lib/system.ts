import { trim, trimEnd } from 'lodash'

type Separator = '\\' | '/'

export function getParentDir(currentPath: string, separator: Separator) {
  let parentDir = `${currentPath.split(separator).slice(0, -1).join(separator)}`
  if (parentDir === '' || parentDir.endsWith(':')) {
    parentDir = separator
  }
  return parentDir
}

export function getChildDirectoryPath({
  currentPath,
  childPath,
  separator,
}: {
  currentPath: string
  childPath: string
  separator: Separator
}) {
  let fullPath = ''
  if (currentPath === '\\' && childPath.endsWith(':')) {
    // if '\\' + 'C:' => 'C:\\' do not include the root `\\`
    fullPath = childPath + separator
  } else {
    fullPath = joinPaths(currentPath, childPath, separator)
  }
  return fullPath
}

export function joinPaths(a: string, b: string, separator: Separator) {
  a = a === separator ? a : trimEnd(a, separator)
  b = trim(b, separator)
  if (!a.length) {
    return b
  }
  if (!b.length || b === separator) {
    return a
  }
  if (a === separator) {
    return separator + b
  }
  return a + separator + b
}
