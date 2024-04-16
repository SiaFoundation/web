import {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'

export type RequestParams = Record<
  string,
  string | string[] | number | boolean
> | void

export function parameterizeRoute(
  route: string | null,
  params: RequestParams
): string | null {
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

type Method = 'get' | 'post' | 'patch' | 'put' | 'delete'

export function buildRequestHandler<
  Params = void,
  Data = void,
  Response = void
>(axios: Axios, method: Method, route: string, defaultParams?: Params) {
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

  return (args: Args) => {
    // args is sometimes undefined
    const a = {
      ...args,
    } as {
      params?: Params
      data?: Data
      config?: AxiosRequestConfig<Data>
    }
    const params = {
      ...defaultParams,
      ...a.params,
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const paramRoute = parameterizeRoute(route, params as RequestParams)!

    const data = 'data' in a ? JSON.stringify(a.data) : undefined

    return axios[method]<Response>(paramRoute, data, a?.config)
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
    // Just in case the response is not already JSON
    try {
      const data = JSON.parse(response.data as string)
      return [data, undefined, response]
    } catch (e) {
      return [response.data, undefined, response]
    }
  } catch (error) {
    return [undefined, error as AxiosError<T>, undefined]
  }
}

export function initAxios(api: string, password?: string): Axios {
  const headers: AxiosRequestHeaders = {
    'Content-Type': 'application/json',
  }
  if (password) {
    headers['Authorization'] = `Basic ${btoa(`:${password}`)}`
  }
  return new Axios({
    baseURL: api,
    headers,
    responseType: 'json',
  })
}
