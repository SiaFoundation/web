import { getRenameParams } from './rename'

describe('rename', () => {
  it('directory', () => {
    expect(
      getRenameParams(
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
  it('directory specific', () => {
    expect(
      getRenameParams(
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
  it('file', () => {
    expect(
      getRenameParams(
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
