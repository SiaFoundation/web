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
