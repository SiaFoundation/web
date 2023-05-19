import { trim, trimEnd } from 'lodash'

type Separator = '\\' | '/'

export function getParentDir(currentPath: string, separator: Separator) {
  // currentPath is 'C:\\', return '\\'
  if (currentPath.endsWith(':\\')) {
    return separator
  }

  const parentDir = `${currentPath
    .split(separator)
    .slice(0, -1)
    .join(separator)}`

  // currentPath was '/foo', parentDir is now ''
  if (parentDir === '') {
    return separator
  }

  return parentDir + separator
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
    fullPath = joinPaths(currentPath, childPath, separator) + separator
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
