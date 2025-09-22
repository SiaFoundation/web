import { renderHook } from '@testing-library/react'
import { type Remote } from './types'
import { useRemoteDataset } from './useRemoteDataset'

type Remotes = {
  a: Remote<number>
  b: Remote<number>
}

const transform = (values: { a: number; b: number }): number[] => {
  if (values.a === 0 && values.b === 0) {
    return []
  }
  return [values.a, values.b]
}

const defaultParams = {
  offset: undefined,
  filters: undefined,
}

describe('useRemoteDataset', () => {
  test('returns loading when any dependency is loading initially', () => {
    const { result } = renderHook(() =>
      useRemoteDataset(
        {
          a: { isLoading: true, data: 1, isValidating: true },
          b: { data: 2, isLoading: false, isValidating: false },
        },
        transform,
        defaultParams,
      ),
    )
    expect(result.current.state).toBe('loading')
  })

  test('returns loaded when all dependencies have data with no errors', () => {
    const { result } = renderHook(() =>
      useRemoteDataset(
        {
          a: { data: 42, isValidating: false },
          b: { data: 2, isValidating: false },
        },
        transform,
        defaultParams,
      ),
    )
    expect(result.current.state).toBe('loaded')
    expect(result.current.data).toEqual([42, 2])
    expect('error' in result.current).toBe(false)
  })

  test('returns loaded when revalidating with previous data present', () => {
    const { result } = renderHook(() =>
      useRemoteDataset(
        {
          a: { data: 1, isValidating: true },
          b: { data: 2, isValidating: true },
        },
        transform,
        defaultParams,
      ),
    )
    expect(result.current.state).toBe('loaded')
    expect(result.current.data).toEqual([1, 2])
  })

  test('returns error when any dependency has error', () => {
    const err = new Error('fetch failed')
    const { result } = renderHook(() =>
      useRemoteDataset(
        {
          a: { data: 1, error: err, isValidating: false },
          b: { data: 2, isValidating: false },
        },
        transform,
        defaultParams,
      ),
    )
    expect(result.current.state).toBe('error')
    expect(result.current.data).toBeUndefined()
    expect('error' in result.current && result.current.error).toBe(err)
  })

  test('returns loading when all fields are initial values (before initial loading starts)', () => {
    const { result } = renderHook(() =>
      useRemoteDataset(
        {
          a: { isLoading: false, isValidating: false, data: undefined },
          b: { isLoading: false, isValidating: false, data: undefined },
        },
        transform,
        defaultParams,
      ),
    )
    expect(result.current.state).toBe('loading')
  })

  test('empty result on the first page', () => {
    const { result } = renderHook(() =>
      useRemoteDataset(
        {
          a: { data: 0, isValidating: false },
          b: { data: 0, isValidating: false },
        },
        transform,
        defaultParams,
      ),
    )
    expect(result.current.state).toBe('noneYet')
  })

  test('empty result on the first page with filters', () => {
    const { result } = renderHook(() =>
      useRemoteDataset(
        {
          a: { data: 0, isValidating: false },
          b: { data: 0, isValidating: false },
        },
        transform,
        {
          offset: 0,
          filters: [1],
        },
      ),
    )
    expect(result.current.state).toBe('noneMatchingFilters')
  })

  test('empty result not on the first page', () => {
    const { result } = renderHook(() =>
      useRemoteDataset(
        {
          a: { data: 0, isValidating: false },
          b: { data: 0, isValidating: false },
        },
        transform,
        { offset: 1 },
      ),
    )
    expect(result.current.state).toBe('noneOnPage')
  })

  test('empty result not on the first page with filters', () => {
    const { result } = renderHook(() =>
      useRemoteDataset(
        {
          a: { data: 0, isValidating: false },
          b: { data: 0, isValidating: false },
        },
        transform,
        { offset: 1, filters: [1] },
      ),
    )
    expect(result.current.state).toBe('noneOnPage')
  })

  test('state sequence', () => {
    const { result, rerender } = renderHook(
      ({ remotes }: { remotes: Remotes }) =>
        useRemoteDataset(remotes, transform, defaultParams),
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
        b: { isLoading: false, isValidating: false, data: 8 },
      },
    })
    expect(result.current.state).toBe('loaded')
    expect(result.current.data).toEqual([7, 8])

    // Revalidating.
    rerender({
      remotes: {
        a: { data: 7, isValidating: true },
        b: { data: 8, isValidating: true },
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
        b: { data: 8, isValidating: true },
      },
    })
    expect(result.current.state).toBe('error')

    // Loaded.
    rerender({
      remotes: {
        a: { data: 7, isValidating: false },
        b: { data: 8, isValidating: false },
      },
    })
    expect(result.current.state).toBe('loaded')

    // None yet result.
    rerender({
      remotes: {
        a: { data: 0, isValidating: false },
        b: { data: 0, isValidating: false },
      },
    })
    expect(result.current.data).toBeUndefined()
    expect(result.current.state).toBe('noneYet')

    // None yet retained when revalidating.
    rerender({
      remotes: {
        a: { data: 0, isValidating: true },
        b: { data: 0, isValidating: true },
      },
    })
    expect(result.current.data).toBeUndefined()
    expect(result.current.state).toBe('noneYet')
  })
})
