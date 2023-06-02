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

  // currentPath was 'C:\Users', parentDir is now 'C:', needs to be 'C:\
  if (parentDir.endsWith(':')) {
    return parentDir + separator
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
  let res = ''
  if (!a.length) {
    res = b
  } else if (!b.length || b === separator) {
    res = a
  } else if (a === separator) {
    res = separator + b
  } else {
    res = a + separator + b
  }
  if (res.endsWith(':')) {
    return res + separator
  } else {
    return res
  }
}
