import axios from 'axios'
import { mutate } from 'swr'
import { useAppSettings } from './useAppSettings'
import { getKey } from './utils'

type Response<T> = {
  status: number
  data?: T
  error?: string
}

type UseDelete<Params> = {
  delete: (p: Params) => Promise<Response<never>>
}

export function useDelete<Params extends Record<string, string> | undefined>(
  route: string,
  deps?: string[]
): UseDelete<Params> {
  const { settings, api } = useAppSettings()
  return {
    delete: async (params?: Params) => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (settings.password) {
        headers['Authorization'] = 'Basic ' + btoa(`:${settings.password}`)
      }
      try {
        if (params) {
          const paramKeys = Object.keys(params)
          for (const key of paramKeys) {
            route = route.replace(`:${key}`, params[key])
          }
        }
        const response = await axios.delete(`${api}/${route}`, {
          headers,
        })
        deps?.forEach((dep) => mutate(getKey(dep)))
        return {
          status: response.status,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        return {
          status: e.response.status,
          error: e.response.data,
        } as Response<never>
      }
    },
  }
}
