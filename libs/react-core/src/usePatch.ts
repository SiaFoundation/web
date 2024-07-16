'use client'

import type { RequestParams } from '@siafoundation/request'
import axios from 'axios'
import { useMemo } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import {
  type After,
  type InternalCallbackArgs,
  type InternalHookArgsCallback,
  type InternalHookArgsSwr,
  type InternalHookArgsWithPayloadSwr,
  type Response,
  buildAxiosConfig,
  buildRouteWithParams,
  getPathFromKey,
  mergeInternalCallbackArgs,
  mergeInternalHookArgsCallback,
  mergeInternalHookArgsSwr,
} from './request'
import type { SWRError } from './types'
import { useAppSettings } from './useAppSettings'
import { keyOrNull } from './utils'
import { useWorkflows } from './workflows'

export function usePatchSwr<Params extends RequestParams, Payload, Result>(
  args: InternalHookArgsWithPayloadSwr<Params, Payload, Result>,
) {
  const hookArgs: InternalHookArgsSwr<
    Record<string, string | number | boolean | string[]>,
    Result
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  > = useMemo(() => mergeInternalHookArgsSwr(args as any), [args])
  const { settings, passwordProtectRequestHooks } = useAppSettings()
  const reqRoute = buildRouteWithParams(
    settings,
    hookArgs.route,
    hookArgs,
    undefined,
  )
  const key = useMemo(
    () =>
      keyOrNull(
        reqRoute
          ? `${reqRoute}${JSON.stringify(
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              (args as any).payload !== undefined ? (args as any).payload : '',
            )}`
          : null,
        hookArgs.disabled ||
          (passwordProtectRequestHooks && !settings.password),
      ),
    [reqRoute, args, hookArgs, passwordProtectRequestHooks, settings],
  )
  return useSWR<Result, SWRError>(
    key,
    async () => {
      if (!hookArgs.route) {
        throw Error('No route')
      }
      const reqConfig = buildAxiosConfig(settings, hookArgs, undefined)
      if (!reqRoute) {
        throw Error('No route')
      }
      try {
        const response = await axios.patch<Result>(
          reqRoute,
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          (args as any).payload,
          reqConfig,
        )
        return response.data
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (e: any) {
        const error: SWRError = new Error(e.response.data)
        // Attach extra info to the error object.
        error.status = e.response.status || 500
        throw error
      }
    },
    hookArgs.config?.swr,
  )
}

type PatchFunc<Params extends RequestParams, Payload, Result> = {
  patch: (
    args: InternalCallbackArgs<Params, Payload, Result>,
  ) => Promise<Response<Result>>
}

export function usePatchFunc<Params extends RequestParams, Payload, Result>(
  args: InternalHookArgsCallback<Params, Payload, Result>,
  after?: After<Params, Payload, Result>,
): PatchFunc<Params, Payload, Result> {
  const { mutate } = useSWRConfig()
  const { settings } = useAppSettings()
  const { setWorkflow, removeWorkflow } = useWorkflows()
  const hookArgs = mergeInternalHookArgsCallback(args)
  return {
    patch: async (args: InternalCallbackArgs<Params, Payload, Result>) => {
      const callArgs = mergeInternalCallbackArgs(args)
      try {
        const reqConfig = buildAxiosConfig(settings, hookArgs, callArgs)
        const reqRoute = buildRouteWithParams(
          settings,
          hookArgs.route,
          hookArgs,
          callArgs,
        )
        if (!reqRoute) {
          throw Error('No route')
        }
        let payload: Payload | undefined = undefined
        if ('payload' in callArgs) {
          payload = callArgs.payload
        }

        const key = `${reqRoute}${JSON.stringify(
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          (args as any).payload !== undefined ? (args as any).payload : '',
        )}`

        const path = getPathFromKey(
          settings,
          reqRoute,
          args,
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          callArgs as any,
        )
        setWorkflow(key, {
          path,
          payload,
        })
        const response = await axios.patch<Result>(reqRoute, payload, reqConfig)
        if (after) {
          await after(
            (matcher, data = (d) => d, opts) =>
              mutate(
                (key) => {
                  if (typeof key !== 'string') {
                    return false
                  }
                  const route = getPathFromKey(
                    settings,
                    key,
                    args,
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    callArgs as any,
                  )
                  return matcher(route)
                },
                data,
                opts,
              ),
            callArgs,
            response,
          )
        }
        removeWorkflow(key)
        return {
          status: response.status,
          data: response.data,
          headers: response.headers,
        }
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (e: any) {
        // If the network is disconnected then response.status will be 0 and
        // data undefined, so return axios e.message error.
        return {
          status: e.response?.status,
          error: e.response?.data || e.message,
        } as Response<Result>
      }
    },
  }
}
