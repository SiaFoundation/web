'use client'

import axios from 'axios'
import { useMemo } from 'react'
import useSWR from 'swr'
import {
  buildAxiosConfig,
  buildRouteWithParams,
  InternalCallbackArgs,
  mergeInternalCallbackArgs,
  Response,
  mergeInternalHookArgsCallback,
  InternalHookArgsSwr,
  mergeInternalHookArgsSwr,
  InternalHookArgsCallback,
} from './request'
import { SWRError } from './types'
import { useAppSettings } from './appSettings'
import { keyOrNull } from './utils'
import { RequestParams } from '@siafoundation/request'
import { useRequestSettings } from './appSettings/useRequestSettings'

export function useGetSwr<Params extends RequestParams, Result>(
  args: InternalHookArgsSwr<Params, Result>
) {
  const hookArgs = useMemo(() => mergeInternalHookArgsSwr(args), [args])
  const { requestSettings, passwordProtectRequestHooks } = useRequestSettings()
  const reqRoute = buildRouteWithParams(
    requestSettings,
    hookArgs.route,
    hookArgs,
    undefined
  )
  return useSWR<Result, SWRError>(
    keyOrNull(
      args.standalone ? `${args.standalone}/${reqRoute}` : reqRoute,
      hookArgs.disabled ||
        (passwordProtectRequestHooks && !requestSettings.password)
    ),
    async () => {
      if (!hookArgs.route) {
        throw Error('No route')
      }
      const reqConfig = buildAxiosConfig(requestSettings, hookArgs, undefined)
      if (!reqRoute) {
        throw Error('No route')
      }
      try {
        const response = await axios.get<Result>(reqRoute, reqConfig)
        return response.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const error: SWRError = new Error(e.response.data)
        // Attach extra info to the error object.
        error.status = e.response.status || 500
        throw error
      }
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
        const reqRoute = buildRouteWithParams(
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
          headers: response.headers,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        // If the network is disconnected then response.status will be 0 and
        // data undefined, so return axios e.message error.
        const error =
          e.response?.data instanceof Blob
            ? await e.response?.data.text()
            : e.response?.data || e.message
        return {
          status: e.response?.status,
          error,
        } as Response<Result>
      }
    },
  }
}
