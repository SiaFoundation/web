'use client'

import { useMemo } from 'react'
import { mutate as swrMutate, MutatorCallback, MutatorOptions } from 'swr'
import { getPathFromKey } from './request'
import { useAppSettings } from './appSettings'

export function useMutate(args?: { api: string }) {
  const { settings } = useAppSettings()
  return useMemo(
    () =>
      function mutate<T>(
        matcher: (key: string) => boolean,
        data?: T | Promise<T> | MutatorCallback<T>,
        opts?: boolean | MutatorOptions<T>
      ): Promise<(T | undefined)[]> {
        return swrMutate(
          (key) => {
            if (typeof key !== 'string') {
              return false
            }
            const route = getPathFromKey(settings, key, args, undefined)
            return matcher(route)
          },
          data,
          opts
        )
      },
    [settings, args]
  )
}
