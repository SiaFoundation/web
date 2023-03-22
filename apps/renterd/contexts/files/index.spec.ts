import { computeSlabHealth } from '.'

describe('slab health', () => {
  it('should be correct', () => {
    expect(computeSlabHealth(30, 10, 40)).toBe(1)
    expect(computeSlabHealth(30, 10, 30)).toBe(1)
    expect(computeSlabHealth(30, 10, 20)).toBe(0.5)
    expect(computeSlabHealth(30, 10, 10)).toBe(0)
    expect(computeSlabHealth(30, 10, 0)).toBe(-0.5)
    expect(computeSlabHealth(30, 10, -10)).toBe(-1)
  })
})
