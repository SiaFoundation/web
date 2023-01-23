import useSWR from 'swr'
import { handleResponse } from './handleResponse'
import { SWRError, SWROptions } from './types'
import { useAppSettings } from './useAppSettings'
import { getKey } from './utils'

export function useGet<Result>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any> | null,
  route: string | null,
  options?: SWROptions<Result>
) {
  const { settings, api } = useAppSettings()
  let paramRoute = route
  if (paramRoute && params) {
    const paramKeys = Object.keys(params)
    for (const key of paramKeys) {
      if (paramRoute.includes(`:${key}`)) {
        paramRoute = paramRoute.replace(`:${key}`, params[key])
      } else {
        if (!paramRoute.includes('?')) {
          paramRoute += `?${key}=${encodeURIComponent(params[key])}`
        } else {
          paramRoute += `&${key}=${encodeURIComponent(params[key])}`
        }
      }
    }
  }
  const fullRoute = paramRoute
    ? paramRoute.startsWith('http')
      ? paramRoute
      : `${options?.api || api}${paramRoute}`
    : null
  return useSWR<Result, SWRError>(
    getKey(
      fullRoute ? `${fullRoute}${settings?.password || ''}` : null,
      options?.disabled
    ),
    async () => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (!fullRoute) {
        throw Error('no route')
      }

      // If it starts with http its not a request to the local app backend
      // so the password should not be sent.
      if (!fullRoute.startsWith('http') && settings.password) {
        headers['Authorization'] = 'Basic ' + btoa(`:${settings.password}`)
      }

      const r = await fetch(fullRoute, {
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
  // const fullRoute = route ? (options?.api || '') + route : null
  const fullRoute = route ? route : null
  return useSWR<T, SWRError>(
    getKey(fullRoute, options?.disabled),
    async () => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (!fullRoute) {
        throw Error('no route')
      }

      const r = await fetch(fullRoute, {
        headers,
      })
      return handleResponse(r)
    },
    options
  )
}
