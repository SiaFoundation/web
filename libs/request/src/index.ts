import { merge } from '@technically/lodash'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios'

export type RequestParams = Record<
  string,
  string | string[] | number | number[] | boolean | boolean[]
> | void

export function parameterizeRoute(
  route: string,
  params: RequestParams,
): string {
  if (route && params) {
    const paramKeys = Object.keys(params)
    for (const key of paramKeys) {
      const value = params[key]
      if (route.includes(`:${key}`)) {
        // Path parameter: convert to string
        const stringValue = Array.isArray(value)
          ? String(value[0])
          : String(value)
        route = route.replace(`:${key}`, stringValue)
      } else {
        // Query parameter: handle arrays as multiple params
        if (Array.isArray(value)) {
          // For arrays, add multiple query params with the same name
          for (const item of value) {
            const encodedValue = encodeURIComponent(String(item))
            if (!route.includes('?')) {
              route += `?${key}=${encodedValue}`
            } else {
              route += `&${key}=${encodedValue}`
            }
          }
        } else {
          // For non-arrays, add single query param
          const encodedValue = encodeURIComponent(String(value))
          if (!route.includes('?')) {
            route += `?${key}=${encodedValue}`
          } else {
            route += `&${key}=${encodedValue}`
          }
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
  Response = void,
>(
  axios: AxiosInstance,
  method: RequestMethod,
  route: string,
  options: {
    defaultParams?: Params
    config?: AxiosRequestConfig<Data>
  } = {},
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

    const paramRoute = parameterizeRoute(route, params as RequestParams)

    const data = 'data' in mergedArgs ? mergedArgs.data : undefined

    return axios[method]<Response>(paramRoute, data, mergedArgs?.config)
  }
}

type Success<T> = [data: T, error: undefined, response: AxiosResponse<T>]
type Failure<T> = [
  data: undefined,
  error: AxiosError<T>,
  response: AxiosResponse<T> | undefined,
]

export async function to<T>(
  promise: Promise<AxiosResponse<T>>,
): Promise<Success<T> | Failure<T>> {
  try {
    const response = await promise
    return [response.data, undefined, response]
  } catch (error) {
    const axiosError = error as AxiosError<T>
    return [undefined, axiosError, axiosError.response]
  }
}

export function initAxios(
  api: string,
  password?: string,
  timeout?: number,
): AxiosInstance {
  const headers: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
  }
  if (password) {
    headers['Authorization'] = `Basic ${btoa(`:${password}`)}`
  }
  return axios.create({
    baseURL: api,
    headers,
    timeout,
  })
}
