import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { MutatorCallback, MutatorOptions } from 'swr'
import { SWROptions } from './types'
import { AppSettings } from './useAppSettings'

export type RequestParams = Record<
  string,
  string | string[] | number | boolean
> | void

export type RequestConfig<Payload, Result> = {
  swr?: SWROptions<Result>
  axios?: AxiosRequestConfig<Payload>
}

export type HookArgsSwr<
  Params extends RequestParams,
  Result
> = Params extends void
  ? {
      api?: string
      config?: RequestConfig<void, Result>
      disabled?: boolean
    }
  : {
      params: Params
      api?: string
      config?: RequestConfig<void, Result>
      disabled?: boolean
    }

export type InternalHookArgsSwr<
  Params extends RequestParams,
  Result
> = HookArgsSwr<Params, Result> & {
  route: string
  config?: RequestConfig<void, Result>
}

export type HookArgsWithPayloadSwr<
  Params extends RequestParams,
  Payload,
  Result
> = Params extends void
  ? Payload extends void
    ? {
        api?: string
        config?: RequestConfig<void, Result>
        disabled?: boolean
      }
    : {
        api?: string
        payload: Payload
        config?: RequestConfig<void, Result>
        disabled?: boolean
      }
  : Payload extends void
  ? {
      params: Params
      api?: string
      config?: RequestConfig<void, Result>
      disabled?: boolean
    }
  : {
      params: Params
      payload: Payload
      api?: string
      config?: RequestConfig<void, Result>
      disabled?: boolean
    }

export type InternalHookArgsWithPayloadSwr<
  Params extends RequestParams,
  Payload,
  Result
> = HookArgsWithPayloadSwr<Params, Payload, Result> & {
  route: string
  config?: RequestConfig<void, Result>
}

export type HookArgsCallback<Params extends RequestParams, Payload, Result> = {
  api?: string
  config?: RequestConfig<Payload, Result>
  disabled?: boolean
  defaultParams?: Params
}

export type InternalHookArgsCallback<
  Params extends RequestParams,
  Payload,
  Result
> = HookArgsCallback<Params, Payload, Result> & {
  route: string
  defaultParams?: Params
}

export type InternalHookArgs<
  Params extends RequestParams,
  Result
> = Params extends void
  ? {
      api?: string
      config?: RequestConfig<void, Result>
      route: string
      disabled?: boolean
    }
  : {
      params: Params
      api?: string
      config?: RequestConfig<void, Result>
      route: string
      disabled?: boolean
    }

export type InternalCallbackArgs<
  Params extends RequestParams,
  Payload,
  Result
> = Params extends void
  ? Payload extends void
    ? {
        api?: string
        config?: RequestConfig<Payload, Result>
      }
    : {
        payload: Payload
        api?: string
        config?: RequestConfig<Payload, Result>
      }
  : Payload extends void
  ? {
      params: Params
      api?: string
      config?: RequestConfig<Payload, Result>
    }
  : {
      params: Params
      payload: Payload
      api?: string
      config?: RequestConfig<Payload, Result>
    }

export function mergeInternalHookArgsCallback<
  Params extends RequestParams,
  Payload,
  Result
>(
  args: InternalHookArgsCallback<Params, Payload, Result>
): InternalHookArgsCallback<Params, Payload, Result> {
  return {
    ...args,
    config: {
      ...args?.config,
    },
  }
}

export function mergeInternalHookArgsSwr<Params extends RequestParams, Result>(
  args: InternalHookArgsSwr<Params, Result>
): InternalHookArgsSwr<Params, Result> {
  return {
    ...args,
    config: {
      ...args?.config,
    },
  }
}

export function mergeInternalCallbackArgs<
  Params extends RequestParams,
  Payload,
  Result
>(
  args: InternalCallbackArgs<Params, Payload, Result>
): InternalCallbackArgs<Params, Payload, Result> {
  return {
    ...args,
    config: {
      ...args?.config,
    },
  }
}

export type Response<T> = {
  status: number
  data?: T
  error?: string
}

function getApi<Params extends RequestParams, Payload, Result>(
  settings: AppSettings,
  hookArgs:
    | {
        api?: string
      }
    | undefined,
  callArgs: InternalCallbackArgs<Params, Payload, Result> | undefined
): string {
  return callArgs?.api || hookArgs?.api || settings.api
}

function buildHeaders<Params extends RequestParams, Payload, Result>(
  settings: AppSettings,
  configArgs: InternalHookArgsCallback<Params, Payload, Result>,
  callArgs: InternalCallbackArgs<Params, Payload, Result> | undefined
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...configArgs.config?.axios?.headers,
    ...callArgs?.config?.axios?.headers,
  }
  const api = getApi(settings, configArgs, callArgs)
  // Set password if called against the app-level api
  if (settings.api === api && settings.password) {
    headers['Authorization'] = 'Basic ' + btoa(`:${settings.password}`)
  }
  return headers
}

export function buildAxiosConfig<Params extends RequestParams, Payload, Result>(
  settings: AppSettings,
  configArgs: InternalHookArgsCallback<Params, Payload, Result>,
  callArgs: InternalCallbackArgs<Params, Payload, Result> | undefined
) {
  const headers = buildHeaders(settings, configArgs, callArgs)
  return {
    responseType: 'json',
    ...configArgs.config?.axios,
    ...callArgs?.config?.axios,
    headers,
  } as AxiosRequestConfig<Payload>
}

function parameterizeRoute(
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

export function buildRouteWithParams<
  Params extends RequestParams,
  Payload,
  Result
>(
  settings: AppSettings,
  route: string | null,
  hookArgs:
    | {
        api?: string
        params?: Params
      }
    | undefined,
  callArgs: InternalCallbackArgs<Params, Payload, Result> | undefined
): string | null {
  if (!route) {
    return null
  }
  let params = hookArgs?.params || {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (callArgs && (callArgs as any).params) {
    params = {
      ...params,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(callArgs as any).params,
    }
  }
  route = parameterizeRoute(route, params)
  if (!route) {
    return null
  }
  const api = getApi(settings, hookArgs, callArgs)
  if (api === settings.api) {
    return `${api}/api${route}`
  }
  return `${api}${route}`
}

export function getPathFromKey<Params extends RequestParams, Payload, Result>(
  settings: AppSettings,
  route: string,
  hookArgs:
    | {
        api?: string
        params?: Params
      }
    | undefined,
  callArgs: InternalCallbackArgs<Params, Payload, Result> | undefined
): string {
  const api = getApi(settings, hookArgs, callArgs)
  if (api === settings.api) {
    return route.replace(`${api}/api`, '')
  }
  return route.replace(api, '')
}

export type After<Params extends RequestParams, Payload, Result> = (
  mutate: <T>(
    matcher: (key: string) => boolean,
    data?: T | Promise<T> | MutatorCallback<T>,
    opts?: boolean | MutatorOptions<T>
  ) => Promise<(T | undefined)[]>,
  args: InternalCallbackArgs<Params, Payload, Result>,
  response: AxiosResponse<Result, void>
) => Promise<void>
