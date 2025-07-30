'use client'

import { useMemo } from 'react'
import { MutatorCallback, MutatorOptions, useSWRConfig } from 'swr'
import { getRouteFromKey } from './request'
import { RequestSettings } from './appSettings/useRequestSettings/types'
import { useRequestSettings } from './appSettings/useRequestSettings'
import { ScopedMutator } from 'swr/_internal'

export type UseMutateReturn = <T>(
  matcher: (key: string) => boolean,
  data?: T | Promise<T> | MutatorCallback<T>,
  opts?: boolean | MutatorOptions<T>,
) => Promise<(T | undefined)[]>

export function useMutate(args?: { api: string }): UseMutateReturn {
  const { requestSettings } = useRequestSettings()
  const { mutate } = useSWRConfig()
  return useMemo(
    () =>
      function mutateFn<T>(
        matcher: (route: string) => boolean,
        data?: T | Promise<T> | MutatorCallback<T>,
        opts?: boolean | MutatorOptions<T>,
      ): Promise<(T | undefined)[]> {
        return buildMutateMatcherFn(
          mutate,
          requestSettings,
          args,
          undefined,
          matcher,
          data,
          opts,
        )
      },
    [mutate, requestSettings, args],
  )
}

export function buildMutateMatcherFn<T>(
  mutate: ScopedMutator,
  requestSettings: RequestSettings,
  hookArgs: { api?: string } | undefined,
  callArgs: { api?: string } | undefined,
  matcher: (key: string) => boolean,
  data: T | Promise<T> | MutatorCallback<T> | undefined,
  opts?: boolean | MutatorOptions<T>,
): Promise<(T | undefined)[]> {
  return mutate(
    (key) => {
      if (!key || typeof key === 'string' || key.length !== 2) {
        return false
      }
      const route = getRouteFromKey(
        requestSettings,
        key as [string, string],
        hookArgs,
        callArgs,
      )
      return matcher(route)
    },
    data || ((d) => d),
    opts,
  )
}
