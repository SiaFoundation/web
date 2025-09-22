import { renderHook } from '@testing-library/react'
import { type Remote } from './types'
import { useRemoteData } from './useRemoteData'

type Remotes = {
  a: Remote<number>
  b: Remote<string>
}

const transform = (values: { a: number; b: string }): string | undefined => {
  if (values.b === 'empty') {
    return undefined
  }
  return `${values.b}:${values.a}`
}

describe('useRemoteData', () => {
  test('returns loading when any dependency is loading initially', () => {
    const { result } = renderHook(() =>
      useRemoteData(
        {
          a: { isLoading: true, data: 1, isValidating: true },
          b: { data: 'x', isLoading: false, isValidating: false },
        },
        transform,
      ),
    )
    expect(result.current.state).toBe('loading')
  })

  test('returns loaded when all dependencies have data with no errors', () => {
    const { result } = renderHook(() =>
      useRemoteData(
        {
          a: { data: 42, isValidating: false },
          b: { data: 'ok', isValidating: false },
        },
        transform,
      ),
    )
    expect(result.current.state).toBe('loaded')
    expect(result.current.data).toBe('ok:42')
    expect('error' in result.current).toBe(false)
  })

  test('returns loaded when revalidating with previous data present', () => {
    const { result } = renderHook(() =>
      useRemoteData(
        {
          a: { data: 1, isValidating: true },
          b: { data: 'x', isValidating: true },
        },
        transform,
      ),
    )
    expect(result.current.state).toBe('loaded')
    expect(result.current.data).toBe('x:1')
  })

  test('returns error when any dependency has error', () => {
    const err = new Error('fetch failed')
    const { result } = renderHook(() =>
      useRemoteData(
        {
          a: { data: 1, error: err, isValidating: false },
          b: { data: 'x', isValidating: false },
        },
        transform,
      ),
    )
    expect(result.current.state).toBe('error')
    expect(result.current.data).toBeUndefined()
    expect('error' in result.current && result.current.error).toBe(err)
  })

  test('returns loading when all fields are initial values (before initial loading starts)', () => {
    const { result } = renderHook(() =>
      useRemoteData(
        {
          a: { isLoading: false, isValidating: false, data: undefined },
          b: { isLoading: false, isValidating: false, data: undefined },
        },
        transform,
      ),
    )
    expect(result.current.state).toBe('loading')
  })

  test('state sequence', () => {
    const { result, rerender } = renderHook(
      ({ remotes }: { remotes: Remotes }) => useRemoteData(remotes, transform),
      {
        initialProps: {
          remotes: {
            a: { isLoading: true, isValidating: false, data: undefined },
            b: { isLoading: false, isValidating: false, data: undefined },
          } as Remotes,
        },
      },
    )

    // Pre initial loading.
    expect(result.current.state).toBe('loading')

    // Initial loading.
    rerender({
      remotes: {
        a: { isLoading: true, isValidating: false, data: undefined },
        b: { isLoading: false, isValidating: false, data: undefined },
      },
    })
    expect(result.current.state).toBe('loading')

    // Loaded.
    rerender({
      remotes: {
        a: { isLoading: false, isValidating: false, data: 7 },
        b: { isLoading: false, isValidating: false, data: 'ok' },
      },
    })
    expect(result.current.state).toBe('loaded')
    expect(result.current.data).toBe('ok:7')

    // Revalidating.
    rerender({
      remotes: {
        a: { data: 7, isValidating: true },
        b: { data: 'ok', isValidating: true },
      },
    })
    expect(result.current.state).toBe('loaded')

    // Errored.
    const err = new Error('refresh failed')
    rerender({
      remotes: {
        a: { data: 7, isValidating: false },
        b: { data: undefined, isValidating: false, error: err },
      },
    })
    expect(result.current.state).toBe('error')

    // Error retained when revalidating.
    rerender({
      remotes: {
        a: { data: 7, isValidating: true },
        b: { data: 'ok', isValidating: true },
      },
    })
    expect(result.current.state).toBe('error')

    // Loaded.
    rerender({
      remotes: {
        a: { data: 7, isValidating: false },
        b: { data: 'ok', isValidating: false },
      },
    })
    expect(result.current.state).toBe('loaded')

    // Not found result.
    rerender({
      remotes: {
        a: { data: 7, isValidating: false },
        b: { data: 'empty', isValidating: false },
      },
    })
    expect(result.current.data).toBeUndefined()
    expect(result.current.state).toBe('notFound')

    // Not found retained when revalidating.
    rerender({
      remotes: {
        a: { data: 7, isValidating: true },
        b: { data: 'empty', isValidating: true },
      },
    })
    expect(result.current.data).toBeUndefined()
    expect(result.current.state).toBe('notFound')
  })
})
