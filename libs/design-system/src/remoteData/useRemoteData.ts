'use client'

import { useMemo, useRef } from 'react'
import {
  RemoteData,
  Dep,
  ValuesOf,
  checkAnyLoading,
  checkAnyRevalidating,
  checkAnyHaveError,
  checkAllHaveData,
  getValues,
} from './types'

export function useRemoteData<TDeps extends Record<string, Dep<unknown>>, O>(
  deps: TDeps,
  transform: (values: ValuesOf<TDeps>) => O,
): RemoteData<O> {
  const currentState = deriveCurrentState(deps, transform)
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

function deriveCurrentState<TDeps extends Record<string, Dep<unknown>>, O>(
  deps: TDeps,
  transform: (values: ValuesOf<TDeps>) => O,
): RemoteData<O> {
  const anyLoading = checkAnyLoading(deps)
  const anyRevalidating = checkAnyRevalidating(deps)
  const anyError = checkAnyHaveError(deps)
  const allData = checkAllHaveData(deps)
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
    const data = transform(getValues(deps))
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
