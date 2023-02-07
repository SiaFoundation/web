import axios from 'axios'
import { useMemo } from 'react'
import useSWR from 'swr'
import {
  buildAxiosConfig,
  buildRoute,
  InternalCallbackArgs,
  mergeInternalCallbackArgs,
  RequestParams,
  Response,
  mergeInternalHookArgsCallback,
  InternalHookArgsSwr,
  mergeInternalHookArgsSwr,
  InternalHookArgsCallback,
} from './request'
import { SWRError } from './types'
import { useAppSettings } from './useAppSettings'
import { getKey } from './utils'

export function useGet<Params extends RequestParams, Result>(
  args: InternalHookArgsSwr<Params, Result>
) {
  const hookArgs = useMemo(() => mergeInternalHookArgsSwr(args), [args])
  const { settings, passwordProtectRequestHooks } = useAppSettings()
  const reqRoute = buildRoute(settings, hookArgs.route, hookArgs, undefined)
  return useSWR<Result, SWRError>(
    // TODO: add a config to app settings to set password protected app or not,
    // renterd etc require password, explorer do not, disable hook fetching if
    // password protected and password is missing.
    getKey(
      reqRoute ? `${reqRoute}${settings.password || ''}` : null,
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
      const response = await axios.get<Result>(reqRoute, reqConfig)
      return response.data
    },
    hookArgs.config?.swr
  )
}

type GetFunc<Params extends RequestParams, Result> = {
  get: (
    args: InternalCallbackArgs<Params, void, Result>
  ) => Promise<Response<Result>>
}

export function useGetFunc<Params extends RequestParams, Result>(
  args: InternalHookArgsCallback<Params, void, Result>
): GetFunc<Params, Result> {
  const { settings } = useAppSettings()
  const hookArgs = mergeInternalHookArgsCallback(args)
  return {
    get: async (args: InternalCallbackArgs<Params, void, Result>) => {
      const callArgs = mergeInternalCallbackArgs(args)
      try {
        const reqConfig = buildAxiosConfig(settings, hookArgs, callArgs)
        const reqRoute = buildRoute(
          settings,
          hookArgs.route,
          hookArgs,
          callArgs
        )
        if (!reqRoute) {
          throw Error('No route')
        }
        const response = await axios.get<Result>(reqRoute, reqConfig)
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
