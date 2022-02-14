import { parseFilesize } from './bytes'

describe('bytes', () => {
  it('converts gb to bytes', () => {
    const cases = [
      {
        in: '1b',
        out: '1',
      },
      {
        in: '1KB',
        out: '1000',
      },
      {
        in: '1MB',
        out: '1000000',
      },
      {
        in: '1GB',
        out: '1000000000',
      },
      {
        in: '1TB',
        out: '1000000000000',
      },
      {
        in: '1KiB',
        out: '1024',
      },
      {
        in: '1MiB',
        out: '1048576',
      },
      {
        in: '1.2345KB',
        out: '1234',
      },
      {
        in: '123GiB',
        out: '132070244352',
      },
    ]
    for (const c of cases) {
      const b = parseFilesize(c.in)
      expect(b).toBe(c.out)
    }
  })
})
