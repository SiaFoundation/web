import { getMoveFileRenameParams, getRenameFileRenameParams } from './rename'

describe('getMoveFileRenameParams', () => {
  it('directory current', () => {
    expect(
      getMoveFileRenameParams(
        {
          active: {
            id: 'default/path/a/',
          },
          collisions: [],
        },
        ['default', 'path', 'to']
      )
    ).toEqual({
      bucket: 'default',
      from: '/path/a/',
      to: '/path/to/a/',
      mode: 'multi',
    })
  })
  it('directory nested collision', () => {
    expect(
      getMoveFileRenameParams(
        {
          active: {
            id: 'default/path/a/',
          },
          collisions: [
            {
              id: 'default/path/nested/',
            },
          ],
        },
        ['default', 'path', 'to']
      )
    ).toEqual({
      bucket: 'default',
      from: '/path/a/',
      to: '/path/nested/a/',
      mode: 'multi',
    })
  })
  it('file current', () => {
    expect(
      getMoveFileRenameParams(
        {
          active: {
            id: 'default/path/a',
          },
          collisions: [],
        },
        ['default', 'path', 'to']
      )
    ).toEqual({
      bucket: 'default',
      from: '/path/a',
      to: '/path/to/a',
      mode: 'single',
    })
  })
  it('file nested collision', () => {
    expect(
      getMoveFileRenameParams(
        {
          active: {
            id: 'default/path/a',
          },
          collisions: [
            {
              id: 'default/path/nested/',
            },
          ],
        },
        ['default', 'path', 'to']
      )
    ).toEqual({
      bucket: 'default',
      from: '/path/a',
      to: '/path/nested/a',
      mode: 'single',
    })
  })
})

describe('getRenameFileRenameParams', () => {
  it('directory', () => {
    expect(getRenameFileRenameParams('default/path/a/', 'b')).toEqual({
      bucket: 'default',
      from: '/path/a/',
      to: '/path/b/',
      mode: 'multi',
    })
    expect(getRenameFileRenameParams('default/path/a/', 'b/')).toEqual({
      bucket: 'default',
      from: '/path/a/',
      to: '/path/b/',
      mode: 'multi',
    })
  })
  it('file', () => {
    expect(getRenameFileRenameParams('default/path/a', 'b')).toEqual({
      bucket: 'default',
      from: '/path/a',
      to: '/path/b',
      mode: 'single',
    })
  })
})
