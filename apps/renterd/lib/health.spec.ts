import { computeSlabContractSetShards, computeSlabHealth } from './health'

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

describe('contract set shards', () => {
  it('should be correct', () => {
    expect(
      computeSlabContractSetShards({
        totalShards: 30,
        minShards: 10,
        health: 1.5,
      }),
    ).toBe(30)
    expect(
      computeSlabContractSetShards({
        totalShards: 30,
        minShards: 10,
        health: 1,
      }),
    ).toBe(30)
    expect(
      computeSlabContractSetShards({
        totalShards: 30,
        minShards: 10,
        health: 0.75,
      }),
    ).toBe(25)
    expect(
      computeSlabContractSetShards({
        totalShards: 30,
        minShards: 10,
        health: 0.5,
      }),
    ).toBe(20)
    expect(
      computeSlabContractSetShards({
        totalShards: 30,
        minShards: 10,
        health: 0.1,
      }),
    ).toBe(12)
    expect(
      computeSlabContractSetShards({
        totalShards: 30,
        minShards: 10,
        health: 0,
      }),
    ).toBe(10)
    expect(
      computeSlabContractSetShards({
        totalShards: 30,
        minShards: 10,
        health: -0.25,
      }),
    ).toBe(5)
    expect(
      computeSlabContractSetShards({
        totalShards: 30,
        minShards: 10,
        health: -0.5,
      }),
    ).toBe(0)
    expect(
      computeSlabContractSetShards({
        totalShards: 30,
        minShards: 10,
        health: -1,
      }),
    ).toBe(0)
  })
})
