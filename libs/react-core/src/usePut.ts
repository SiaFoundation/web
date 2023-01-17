import axios from 'axios'
import { mutate } from 'swr'
import { useAppSettings } from './useAppSettings'
import { getKey } from './utils'

type Put<Params extends Record<string, string> | undefined, Payload> = {
  payload?: Payload
  params?: Params
}

type Response<T> = {
  status: number
  data?: T
  error?: string
}

type UsePut<
  Params extends Record<string, string> | undefined,
  Payload,
  Result
> = {
  put: (payload: Put<Params, Payload>) => Promise<Response<Result>>
}

export function usePut<
  Params extends Record<string, string> | undefined,
  Payload,
  Result
>(route: string, deps?: string[]): UsePut<Params, Payload, Result> {
  const { settings, api } = useAppSettings()
  return {
    put: async ({ payload, params }: Put<Params, Payload>) => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (settings.password) {
        headers['Authorization'] = 'Basic ' + btoa(`:${settings.password}`)
      }
      try {
        let paramRoute = route
        if (params) {
          const paramKeys = Object.keys(params)
          for (const key of paramKeys) {
            paramRoute = paramRoute.replace(`:${key}`, params[key])
          }
        }
        const response = await axios.put<Result>(
          paramRoute.startsWith('http') ? paramRoute : `${api}/${paramRoute}`,
          payload,
          {
            headers,
          }
        )
        deps?.forEach((dep) => mutate(getKey(dep)))
        return {
          status: response.status,
          data: response.data,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        return {
          status: e.response.status,
          error: e.response.data,
        } as Response<Result>
      }
    },
  }
}
