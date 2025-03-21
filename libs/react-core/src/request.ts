import { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios'
import { MutatorCallback, MutatorOptions } from 'swr'
import { SWROptions } from './types'
import { RequestSettings } from './appSettings/useRequestSettings/types'
import { RequestParams, parameterizeRoute } from '@siafoundation/request'

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
  headers?: AxiosResponseHeaders
  error?: string
}

function getApi(
  requestSettings: RequestSettings,
  hookArgs:
    | {
        api?: string
      }
    | undefined,
  callArgs: { api?: string } | undefined
): string {
  return callArgs?.api || hookArgs?.api || requestSettings.api
}

function buildHeaders<Params extends RequestParams, Payload, Result>(
  settings: RequestSettings,
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
  settings: RequestSettings,
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

export function buildRouteWithParams<
  Params extends RequestParams,
  Payload,
  Result
>(
  settings: RequestSettings,
  route: string,
  hookArgs:
    | {
        api?: string
        params?: Params
      }
    | undefined,
  callArgs: InternalCallbackArgs<Params, Payload, Result> | undefined
): string {
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
  const api = getApi(settings, hookArgs, callArgs)
  // If the api is the same as the settings api then we are signing in to a
  // daemon app and calling a default daemon API which is always prefixed with
  // /api. If this implicit assumption does not hold in the future we can make
  // control over this path building logic more explicit.
  if (api === settings.api) {
    return `${api}/api${route}`
  }
  return `${api}${route}`
}

export function getRouteFromKey(
  settings: RequestSettings,
  key: [string, string],
  hookArgs:
    | {
        api?: string
      }
    | undefined,
  callArgs: { api?: string } | undefined
): string {
  const api = getApi(settings, hookArgs, callArgs)
  if (api === settings.api) {
    return key[1].replace(`${api}/api`, '')
  }
  return key[1].replace(api, '')
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
