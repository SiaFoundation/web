import axios from 'axios'
import { mutate } from 'swr'
import { useSettings } from './useSettings'
import { getKey } from './utils'

type Post<T> = {
  payload: T
  param?: string
}

type Response<T> = {
  status: number
  data?: T
  error?: string
}

type UsePost<P, R> = {
  post: (p: Post<P>) => Promise<Response<R>>
}

export function usePost<P, R>(route: string, deps?: string[]): UsePost<P, R> {
  const { settings, api } = useSettings()
  return {
    post: async ({ payload, param = '' }: Post<P>) => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (settings.password) {
        headers['Authorization'] = 'Basic ' + btoa(`:${settings.password}`)
      }
      try {
        const response = await axios.post<R>(
          param ? `${api}/${route}/${param}` : `${api}/${route}`,
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
        } as Response<R>
      }
    },
  }
}
