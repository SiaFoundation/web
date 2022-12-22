import useSWR from 'swr'
import { handleResponse } from './handleResponse'
import { SWRError, SWROptions } from './types'
import { useAppSettings } from './useAppSettings'
import { getKey } from './utils'

export function useGet<Result>(
  params: Record<string, any> | null,
  route: string | null,
  options?: SWROptions<Result>
) {
  const { settings, api } = useAppSettings()
  if (route && params) {
    const paramKeys = Object.keys(params)
    for (const key of paramKeys) {
      if (route.includes(`:${key}`)) {
        route = route.replace(`:${key}`, params[key])
      } else {
        if (!route.includes('?')) {
          route += `?${key}=${encodeURIComponent(params[key])}`
        } else {
          route += `&${key}=${encodeURIComponent(params[key])}`
        }
      }
    }
  }
  return useSWR<Result, SWRError>(
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
