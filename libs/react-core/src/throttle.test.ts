import { throttle } from './throttle'
import { jest, describe, it, expect, beforeEach } from '@jest/globals'

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('both', () => {
    const fn = jest.fn()
    throttle('test', 100, fn)
    throttle('test', 100, fn)
    throttle('test', 100, fn)

    expect(fn).toHaveBeenCalledTimes(1)

    jest.runAllTimers()

    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('trailing', () => {
    const fn = jest.fn()
    throttle('test', 100, fn, 'trailing')
    throttle('test', 100, fn, 'trailing')
    throttle('test', 100, fn, 'trailing')

    expect(fn).toHaveBeenCalledTimes(0)

    jest.runAllTimers()

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('leading', () => {
    const fn = jest.fn()
    throttle('test', 100, fn, 'leading')
    throttle('test', 100, fn, 'leading')
    throttle('test', 100, fn, 'leading')

    expect(fn).toHaveBeenCalledTimes(1)

    jest.runAllTimers()

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should use the last cached function', () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    throttle('test2', 100, fn1, 'trailing')
    throttle('test2', 100, fn2, 'trailing')

    jest.runAllTimers()

    expect(fn2).toHaveBeenCalledTimes(1)
  })
})
