import { bucketAndKeyParamsFromPath, getDirPath, getFilePath } from './paths'

describe('getFilePath', () => {
  it('a', () => {
    expect(getFilePath('bucket/dir/', '/path/to/file.txt')).toEqual(
      'bucket/dir/path/to/file.txt'
    )
  })
  it('b', () => {
    expect(getFilePath('bucket/dir/', '')).toEqual('bucket/dir/')
  })
  it('b', () => {
    expect(getFilePath('bucket/dir/', '/')).toEqual('bucket/dir/')
  })
})

describe('getDirPath', () => {
  it('a', () => {
    expect(getDirPath('bucket/dir/', '/path/to/dir')).toEqual(
      'bucket/dir/path/to/dir/'
    )
  })
  it('b', () => {
    expect(getDirPath('bucket/dir/', '')).toEqual('bucket/dir/')
  })
  it('c', () => {
    expect(getDirPath('bucket/dir/', '/')).toEqual('bucket/dir/')
  })
})

describe('bucketAndKeyParamsFromPath', () => {
  it('works for file', () => {
    expect(bucketAndKeyParamsFromPath('bucket/path/to/file.txt')).toEqual({
      bucket: 'bucket',
      key: 'path/to/file.txt',
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
