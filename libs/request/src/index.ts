import { Axios, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

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
>(axios: Axios, method: Method, route: string) {
  type Args = Params extends void
    ? Data extends void
      ? { config?: AxiosRequestConfig<Data> }
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
    const a = args || ({} as Args)
    const paramRoute =
      'params' in a
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          parameterizeRoute(route, a.params as RequestParams)!
        : route

    const data = 'data' in a ? a.data : undefined

    return axios[method]<Response>(paramRoute, data, a?.config)
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
  })
}
