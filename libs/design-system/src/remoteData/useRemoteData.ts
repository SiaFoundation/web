'use client'

import { useMemo, useRef } from 'react'
import {
  RemoteData,
  Remote,
  ValuesOf,
  checkAnyLoading,
  checkAnyValidating,
  checkAnyHaveError,
  checkAllHaveData,
  getValues,
} from './types'
import { useStableRemotes } from './utils'

/**
 * Combines multiple Remote data sources into a single RemoteData state.
 *
 * This hook aggregates the loading, validating, error, and data states from multiple
 * Remote objects and transforms their values into a single output. It handles state
 * transitions smoothly and prevents UI flickering during revalidation by retaining
 * previous error or empty states until validation completes.
 *
 * @param remotes - An object containing multiple Remote data sources. Each Remote must
 *   have `isValidating` (required), optionally `isLoading`, and `data` (required).
 * @param transform - A function that transforms the `data` values from all remotes
 *   into the output type. If this function returns `undefined` or `null`, the state will
 *   be `'notFound'` instead of `'loaded'`.
 *
 * @returns A RemoteData object with one of the following states:
 *   - `'loading'`: Initial load or any remote is loading
 *   - `'loaded'`: All remotes have data and transform returned a value
 *   - `'notFound'`: All remotes have data but transform returned undefined/null
 *   - `'error'`: Any remote has an error
 *
 * @example
 * ```tsx
 * const result = useRemoteData(
 *   {
 *     user: { data: userData, isValidating: false },
 *     settings: { data: settingsData, isValidating: false },
 *   },
 *   (values) => ({ user: values.user, settings: values.settings })
 * )
 *
 * if (result.state === 'loading') return <Skeleton />
 * if (result.state === 'error') return <Error error={result.error} />
 * if (result.state === 'notFound') return <NotFound />
 * return <Content data={result.data} />
 * ```
 */
export function useRemoteData<
  Remotes extends Record<string, Remote<unknown>>,
  O,
>(
  remotes: Remotes,
  transform: (values: ValuesOf<Remotes>) => O,
): RemoteData<O> {
  const stableRemotes = useStableRemotes(remotes)
  const currentState = useMemo(
    () => deriveCurrentState(stableRemotes, transform),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stableRemotes],
  )
  const prevBaseState = useRef<RemoteData<O> | undefined>(undefined)
  return useMemo(() => {
    if (prevBaseState.current?.state === currentState.state) {
      return currentState
    }
    // If we are revalidating, and the previous state was an error or empty,
    // continue to show the previous state until validation completes.
    // This is to avoid a skeleton loader flickering between identical states.
    if (currentState.isValidating && prevBaseState.current) {
      if (prevBaseState.current.state === 'error') {
        return {
          state: 'error',
          data: undefined,
          error: prevBaseState.current.error,
          isValidating: currentState.isValidating,
          isLoading: currentState.isLoading,
        }
      }
      if (prevBaseState.current.state === 'notFound') {
        return {
          state: 'notFound',
          data: undefined,
          isValidating: currentState.isValidating,
          isLoading: currentState.isLoading,
        }
      }
    }
    prevBaseState.current = currentState
    return currentState
  }, [currentState])
}

/**
 * Derives the current RemoteData state from the remotes and transform function.
 *
 * State priority:
 * 1. If any remote is loading → 'loading'
 * 2. If any remote has an error → 'error'
 * 3. If all remotes have data:
 *    - Transform returns truthy value → 'loaded'
 *    - Transform returns falsy value → 'notFound'
 * 4. If any remote is revalidating → 'loading'
 * 5. Initial state (no data, no loading, no error) → 'loading'
 */
function deriveCurrentState<Remotes extends Record<string, Remote<unknown>>, O>(
  remotes: Remotes,
  transform: (values: ValuesOf<Remotes>) => O,
): RemoteData<O> {
  const anyLoading = checkAnyLoading(remotes)
  const anyRevalidating = checkAnyValidating(remotes)
  const anyError = checkAnyHaveError(remotes)
  const allData = checkAllHaveData(remotes)
  const startState = !anyLoading && !anyRevalidating && !anyError && !allData

  if (startState) {
    return {
      state: 'loading',
      data: undefined,
      isValidating: anyRevalidating,
      isLoading: anyLoading,
    }
  }

  if (anyLoading) {
    return {
      state: 'loading',
      data: undefined,
      isValidating: anyRevalidating,
      isLoading: anyLoading,
    }
  }

  if (anyError) {
    return {
      state: 'error',
      data: undefined,
      error: anyError,
      isValidating: anyRevalidating,
      isLoading: anyLoading,
    }
  }

  if (allData) {
    const data = transform(getValues(remotes))
    if (data) {
      return {
        state: 'loaded',
        data,
        isValidating: anyRevalidating,
        isLoading: anyLoading,
      }
    }
    return {
      state: 'notFound',
      data: undefined,
      isValidating: anyRevalidating,
      isLoading: anyLoading,
    }
  }

  if (anyRevalidating) {
    return {
      state: 'loading',
      data: undefined,
      isValidating: anyRevalidating,
      isLoading: anyLoading,
    }
  }

  // Should never reach here.
  return {
    state: 'error',
    data: undefined,
    isValidating: anyRevalidating,
    isLoading: anyLoading,
  }
}
