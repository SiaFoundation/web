import { merge } from '@technically/lodash'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'

export type RequestParams = Record<
  string,
  string | string[] | number | boolean
> | void

export function parameterizeRoute(
  route: string,
  params: RequestParams
): string {
  if (route && params) {
    const paramKeys = Object.keys(params)
    for (const key of paramKeys) {
      const value = String(params[key])
      if (route.includes(`:${key}`)) {
        route = route.replace(`:${key}`, value)
      } else {
        if (!route.includes('?')) {
          route += `?${key}=${encodeURIComponent(value)}`
        } else {
          route += `&${key}=${encodeURIComponent(value)}`
        }
      }
    }
  }
  return route
}

export type RequestMethod = 'get' | 'post' | 'patch' | 'put' | 'delete'

export function buildRequestHandler<
  Params = void,
  Data = void,
  Response = void
>(
  axios: AxiosInstance,
  method: RequestMethod,
  route: string,
  options: {
    defaultParams?: Params
    config?: AxiosRequestConfig<Data>
  } = {}
) {
  type Args = Params extends void
    ? Data extends void
      ? { config?: AxiosRequestConfig<Data> } | void
      : { data: Data; config?: AxiosRequestConfig<Data> }
    : Data extends void
    ? {
        params: Params
        config?: AxiosRequestConfig<Data>
      }
    : {
        params: Params
        data: Data
        config?: AxiosRequestConfig<Data>
      }

  type MaybeArgs = {
    params?: Params
    data?: Data
    config?: AxiosRequestConfig<Data>
  }

  return (args: Args) => {
    // Force remove the void type
    const nonVoidArgs: MaybeArgs = {
      ...args,
    }
    const mergedArgs: MaybeArgs = {
      ...nonVoidArgs,
      config: merge(options.config, nonVoidArgs.config),
    }
    const params = {
      ...options.defaultParams,
      ...mergedArgs.params,
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const paramRoute = parameterizeRoute(route, params as RequestParams)!

    const data = 'data' in mergedArgs ? mergedArgs.data : undefined

    return axios[method]<Response>(paramRoute, data, mergedArgs?.config)
  }
}

export async function to<T>(
  promise: Promise<AxiosResponse<T>>
): Promise<
  [
    AxiosResponse<T>['data'] | undefined,
    AxiosError<T> | undefined,
    AxiosResponse<T> | undefined
  ]
> {
  try {
    const response = await promise
    return [response.data, undefined, response]
  } catch (error) {
    return [undefined, error as AxiosError<T>, undefined]
  }
}

export function initAxios(api: string, password?: string): AxiosInstance {
  const headers: AxiosRequestHeaders = {
    'Content-Type': 'application/json',
  }
  if (password) {
    headers['Authorization'] = `Basic ${btoa(`:${password}`)}`
  }
  return axios.create({
    baseURL: api,
    headers,
  })
}
