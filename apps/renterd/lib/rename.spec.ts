import {
  getMoveFileDestinationDirectory,
  getMoveFileOperations,
  getRenameFileRenameParams,
} from './rename'

describe('getMoveFileOperations', () => {
  it('correctly maps from and to paths and sorts more specific operations before broader ones', () => {
    expect(
      getMoveFileOperations(
        [
          'default/path/a/',
          'default/path/a/b/',
          'default/path/a/b/c.jpeg',
          'other/path/a.png',
          'default/path/correct/noop/',
          'default/path/correct/noop.png',
        ],
        getMoveFileDestinationDirectory(['default', 'path', 'xxx'], {
          collisions: [
            {
              id: 'default/path/correct/',
            },
          ],
        }),
      ),
    ).toEqual([
      {
        bucket: 'default',
        from: '/path/a/b/c.jpeg',
        to: '/path/correct/c.jpeg',
        mode: 'single',
      },
      {
        bucket: 'default',
        from: '/path/a/b/',
        to: '/path/correct/b/',
        mode: 'multi',
      },
      {
        bucket: 'default',
        from: '/path/a/',
        to: '/path/correct/a/',
        mode: 'multi',
      },
      {
        bucket: 'other',
        from: '/path/a.png',
        to: '/path/correct/a.png',
        mode: 'single',
      },
    ])
  })
  it('directory current', () => {
    expect(
      getMoveFileOperations(
        ['default/path/a/'],
        getMoveFileDestinationDirectory(['default', 'path', 'to'], {
          collisions: [],
        }),
      ),
    ).toEqual([
      {
        bucket: 'default',
        from: '/path/a/',
        to: '/path/to/a/',
        mode: 'multi',
      },
    ])
  })
  it('directory nested collision', () => {
    expect(
      getMoveFileOperations(
        ['default/path/a/'],
        getMoveFileDestinationDirectory(['default', 'path', 'to'], {
          collisions: [
            {
              id: 'default/path/nested/',
            },
          ],
        }),
      ),
    ).toEqual([
      {
        bucket: 'default',
        from: '/path/a/',
        to: '/path/nested/a/',
        mode: 'multi',
      },
    ])
  })
  it('file current', () => {
    expect(
      getMoveFileOperations(
        ['default/path/a'],
        getMoveFileDestinationDirectory(['default', 'path', 'to']),
      ),
    ).toEqual([
      {
        bucket: 'default',
        from: '/path/a',
        to: '/path/to/a',
        mode: 'single',
      },
    ])
  })
  it('file nested collision', () => {
    expect(
      getMoveFileOperations(
        ['default/path/a'],
        getMoveFileDestinationDirectory(['default', 'path', 'to'], {
          collisions: [
            {
              id: 'default/path/nested/',
            },
          ],
        }),
      ),
    ).toEqual([
      {
        bucket: 'default',
        from: '/path/a',
        to: '/path/nested/a',
        mode: 'single',
      },
    ])
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
