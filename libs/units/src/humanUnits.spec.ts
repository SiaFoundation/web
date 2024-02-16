import { humanTime } from './humanUnits'

describe('humanTime', () => {
  test('milliseconds', () => {
    expect(humanTime(500, { format: 'abbreviated' })).toBe('500ms')
    expect(humanTime(500, { format: 'full' })).toBe('500 milliseconds')
  })

  test('seconds', () => {
    expect(humanTime(15000, { format: 'abbreviated' })).toBe('15s')
    expect(humanTime(15000, { format: 'full' })).toBe('15 seconds')
  })

  test('minutes', () => {
    expect(humanTime(180000, { format: 'abbreviated' })).toBe('3m')
    expect(humanTime(180000, { format: 'full' })).toBe('3 minutes')
  })

  test('hours', () => {
    expect(humanTime(18000000, { format: 'abbreviated' })).toBe('5h')
    expect(humanTime(18000000, { format: 'full' })).toBe('5 hours')
  })

  test('days', () => {
    expect(humanTime(172800000000, { format: 'abbreviated' })).toBe('2000d')
    expect(humanTime(172800000000, { format: 'full' })).toBe('2000 days')
  })

  test('handles zero', () => {
    expect(humanTime(0, { format: 'abbreviated' })).toBe('0ms')
    expect(humanTime(0, { format: 'full' })).toBe('0 milliseconds')
  })
})
