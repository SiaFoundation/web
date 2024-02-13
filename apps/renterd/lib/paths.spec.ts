import {
  bucketAndKeyParamsFromPath,
  buildDirectoryPath,
  getParentDirectoryPath,
  join,
} from './paths'

describe('join', () => {
  it('a', () => {
    expect(join('bucket/dir/', '/path/to/file.txt')).toEqual(
      'bucket/dir/path/to/file.txt'
    )
  })
  it('b', () => {
    expect(join('bucket/dir/', '')).toEqual('bucket/dir/')
  })
  it('b', () => {
    expect(join('bucket/dir/', '/')).toEqual('bucket/dir/')
  })
})

describe('buildDirPath', () => {
  it('a', () => {
    expect(buildDirectoryPath('bucket/dir/', '/path/to/dir')).toEqual(
      'bucket/dir/path/to/dir/'
    )
  })
  it('b', () => {
    expect(buildDirectoryPath('bucket/dir/', '')).toEqual('bucket/dir/')
  })
  it('c', () => {
    expect(buildDirectoryPath('bucket/dir/', '/')).toEqual('bucket/dir/')
  })
})

describe('getParentDirectoryPath', () => {
  it('a', () => {
    expect(getParentDirectoryPath('bucket/dir/')).toEqual('bucket/')
  })
  it('b', () => {
    expect(getParentDirectoryPath('bucket/dir')).toEqual('bucket/')
  })
  it('c', () => {
    expect(getParentDirectoryPath('/')).toEqual('/')
  })
  it('d', () => {
    expect(getParentDirectoryPath('')).toEqual('/')
  })
})

describe('bucketAndKeyParamsFromPath', () => {
  it('works for file', () => {
    expect(bucketAndKeyParamsFromPath('bucket/path/to/file.txt')).toEqual({
      bucket: 'bucket',
      key: 'path/to/file.txt',
    })
  })

  it('works for file with hash in path', () => {
    expect(
      bucketAndKeyParamsFromPath('bucket/path#/to#hash/file#hash.txt')
    ).toEqual({
      bucket: 'bucket',
      key: 'path%23/to%23hash/file%23hash.txt',
    })
  })

  it('works for directory', () => {
    expect(bucketAndKeyParamsFromPath('bucket/path/to/directory/')).toEqual({
      bucket: 'bucket',
      key: 'path/to/directory/',
    })
  })

  it('works for empty', () => {
    expect(bucketAndKeyParamsFromPath('bucket')).toEqual({
      bucket: 'bucket',
      key: '',
    })
  })

  it('works for empty with trailing', () => {
    expect(bucketAndKeyParamsFromPath('bucket/')).toEqual({
      bucket: 'bucket',
      key: '',
    })
  })
})
