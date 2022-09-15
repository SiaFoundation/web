import useSWR from 'swr'
import { handleResponse } from './handleResponse'
import { SWRError, SWROptions } from './types'
import { useSettings } from './useSettings'
import { getKey } from './utils'

export function useGet<T>(route: string | null, options?: SWROptions<T>) {
  const { settings, api } = useSettings()
  return useSWR<T, SWRError>(
    getKey(route ? settings.password + route : null, options?.disabled),
    async () => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (settings.password) {
        headers['Authorization'] = 'Basic ' + btoa(`:${settings.password}`)
      }

      const r = await fetch(`${api}/${route}`, {
        headers,
      })
      return handleResponse(r)
    },
    options
  )
}

export function useGetExternal<T>(
  route: string | null,
  options?: SWROptions<T>
) {
  return useSWR<T, SWRError>(
    getKey(route ? route : null, options?.disabled),
    async () => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (!route) {
        throw Error('no route')
      }

      const r = await fetch(route, {
        headers,
      })
      return handleResponse(r)
    },
    options
  )
}
