import { assignDefined } from './utils'

const from = {
  a: 1,
  b: 2,
  c: 3,
}

describe('utils', () => {
  it('check that object with null properties are skipped', () => {
    const to = {
      a: null,
      b: 'b',
      c: 'c',
    }
    const actual = assignDefined({ ...from }, to)
    const expected = {
      a: 1,
      b: 'b',
      c: 'c',
    }
    expect(actual).toEqual(expected)
  })

  it('check that basic object assign mechanisms work', () => {
    const to = {
      a: 'a',
      b: 'b',
      c: 'c',
    }
    const actual = assignDefined({ ...from }, to)
    expect(actual).toEqual(to)
  })

  it('check that object with undefined properties are skipped', () => {
    const to = {
      a: 'a',
      b: undefined,
      c: undefined,
    }

    const actual = assignDefined({ ...from }, to)
    const expected = {
      a: 'a',
      b: 2,
      c: 3,
    }
    expect(actual).toEqual(expected)
  })
})
