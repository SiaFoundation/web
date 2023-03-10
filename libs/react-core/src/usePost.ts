import axios from 'axios'
import useSWR from 'swr'
import { useMemo } from 'react'
import {
  buildAxiosConfig,
  buildRouteWithParams,
  InternalCallbackArgs,
  mergeInternalCallbackArgs,
  RequestParams,
  Response,
  triggerDeps,
  InternalHookArgsCallback,
  mergeInternalHookArgsCallback,
  DepFn,
  mergeInternalHookArgsSwr,
  InternalHookArgsWithPayloadSwr,
} from './request'
import { SWRError } from './types'
import { useAppSettings } from './useAppSettings'
import { getKey } from './utils'

export function usePostSwr<Params extends RequestParams, Payload, Result>(
  args: InternalHookArgsWithPayloadSwr<Params, Payload, Result>
) {
  const hookArgs = useMemo(() => mergeInternalHookArgsSwr(args), [args])
  const { settings, passwordProtectRequestHooks } = useAppSettings()
  const reqRoute = buildRouteWithParams(
    settings,
    hookArgs.route,
    hookArgs,
    undefined
  )
  return useSWR<Result, SWRError>(
    // TODO: add a config to app settings to set password protected app or not,
    // renterd etc require password, explorer do not, disable hook fetching if
    // password protected and password is missing.
    getKey(
      reqRoute
        ? `${reqRoute}${settings.password || ''}${JSON.stringify(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (args as any).payload !== undefined ? (args as any).payload : ''
          )}`
        : null,
      hookArgs.disabled || (passwordProtectRequestHooks && !settings.password)
    ),
    async () => {
      if (!hookArgs.route) {
        throw Error('No route')
      }
      const reqConfig = buildAxiosConfig(settings, hookArgs, undefined)
      if (!reqRoute) {
        throw Error('No route')
      }
      const response = await axios.post<Result>(
        reqRoute,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (args as any).payload,
        reqConfig
      )
      return response.data
    },
    hookArgs.config?.swr
  )
}

type PostFunc<Params extends RequestParams, Payload, Result> = {
  post: (
    args: InternalCallbackArgs<Params, Payload, Result>
  ) => Promise<Response<Result>>
}

export function usePostFunc<Params extends RequestParams, Payload, Result>(
  args: InternalHookArgsCallback<Params, Payload, Result>,
  deps: DepFn[]
): PostFunc<Params, Payload, Result> {
  const { settings } = useAppSettings()
  const hookArgs = mergeInternalHookArgsCallback(args)
  return {
    post: async (args: InternalCallbackArgs<Params, Payload, Result>) => {
      const callArgs = mergeInternalCallbackArgs(args)
      try {
        const reqConfig = buildAxiosConfig(settings, hookArgs, callArgs)
        const reqRoute = buildRouteWithParams(
          settings,
          hookArgs.route,
          hookArgs,
          callArgs
        )
        if (!reqRoute) {
          throw Error('No route')
        }
        let payload: Payload | undefined = undefined
        if ('payload' in callArgs) {
          payload = callArgs.payload
        }
        const response = await axios.post<Result>(reqRoute, payload, reqConfig)
        triggerDeps(deps, settings, hookArgs, callArgs)
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
