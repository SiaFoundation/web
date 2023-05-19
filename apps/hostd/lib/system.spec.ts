import { getChildDirectoryPath, getParentDir, joinPaths } from './system'

describe('paths', () => {
  it('joinPaths', () => {
    expect(joinPaths('/', '/foo', '/')).toBe('/foo')
    expect(joinPaths('', '/foo', '/')).toBe('foo')
    expect(joinPaths('', 'foo', '/')).toBe('foo')
    expect(joinPaths('/', '', '/')).toBe('/')
    expect(joinPaths('foo', '/', '/')).toBe('foo')
    expect(joinPaths('foo', 'bar', '/')).toBe('foo/bar')
    expect(joinPaths('/foo/bar', 'foo', '/')).toBe('/foo/bar/foo')
    expect(joinPaths('\\', 'C:', '\\')).toBe('\\C:')
  })
  it('getChildDirectoryPath', () => {
    expect(
      getChildDirectoryPath({
        currentPath: '/',
        childPath: 'foo',
        separator: '/',
      })
    ).toBe('/foo/')
    expect(
      getChildDirectoryPath({
        currentPath: '/foo/bar',
        childPath: 'foo',
        separator: '/',
      })
    ).toBe('/foo/bar/foo/')
    expect(
      getChildDirectoryPath({
        currentPath: '/',
        childPath: 'foo/',
        separator: '/',
      })
    ).toBe('/foo/')
    // windows
    expect(
      getChildDirectoryPath({
        currentPath: 'C:',
        childPath: 'foo',
        separator: '\\',
      })
    ).toBe('C:\\foo\\')
    expect(
      getChildDirectoryPath({
        currentPath: 'C:\\',
        childPath: 'foo',
        separator: '\\',
      })
    ).toBe('C:\\foo\\')
    expect(
      getChildDirectoryPath({
        currentPath: '\\',
        childPath: 'C:',
        separator: '\\',
      })
    ).toBe('C:\\')
  })
  it('getParentDir', () => {
    expect(getParentDir('/Users/User', '/')).toBe('/Users/')
    expect(getParentDir('/Users', '/')).toBe('/')
    expect(getParentDir('C:\\Users\\User', '\\')).toBe('C:\\Users\\')
    expect(getParentDir('C:\\Users', '\\')).toBe('C:\\')
    expect(getParentDir('C:\\', '\\')).toBe('\\')
  })
})
