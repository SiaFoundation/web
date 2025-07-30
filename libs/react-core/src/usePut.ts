'use client'

import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { useWorkflows } from './workflows'
import {
  buildAxiosConfig,
  buildRouteWithParams,
  InternalCallbackArgs,
  InternalHookArgsCallback,
  mergeInternalCallbackArgs,
  Response,
  mergeInternalHookArgsCallback,
  After,
  InternalHookArgsWithPayloadSwr,
  mergeInternalHookArgsSwr,
  InternalHookArgsSwr,
  getRouteFromKey,
} from './request'
import { useMemo } from 'react'
import { getKey, keyOrNull } from './utils'
import { SWRError } from './types'
import { RequestParams } from '@siafoundation/request'
import { useRequestSettings } from './appSettings/useRequestSettings'
import { buildMutateMatcherFn } from './mutate'

export function usePutSwr<Params extends RequestParams, Payload, Result>(
  args: InternalHookArgsWithPayloadSwr<Params, Payload, Result>,
) {
  const hookArgs: InternalHookArgsSwr<
    Record<string, string | number | boolean | string[]>,
    Result
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  > = useMemo(() => mergeInternalHookArgsSwr(args as any), [args])
  const { requestSettings, passwordProtectRequestHooks } = useRequestSettings()
  const reqRoute = buildRouteWithParams(
    requestSettings,
    hookArgs.route,
    hookArgs,
    undefined,
  )
  const key = useMemo(
    () =>
      keyOrNull(
        getKey('put', reqRoute, args as { payload: Payload }),
        hookArgs.disabled ||
          (passwordProtectRequestHooks && !requestSettings.password),
      ),
    [reqRoute, args, hookArgs, passwordProtectRequestHooks, requestSettings],
  )
  return useSWR<Result, SWRError>(
    key,
    async () => {
      if (!hookArgs.route) {
        throw Error('No route')
      }
      const reqConfig = buildAxiosConfig(requestSettings, hookArgs, undefined)
      if (!reqRoute) {
        throw Error('No route')
      }
      try {
        const response = await axios.put<Result>(
          reqRoute,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (args as any).payload,
          reqConfig,
        )
        return response.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

type PutFunc<Params extends RequestParams, Payload, Result> = {
  put: (
    args: InternalCallbackArgs<Params, Payload, Result>,
  ) => Promise<Response<Result>>
}

export function usePutFunc<Params extends RequestParams, Payload, Result>(
  args: InternalHookArgsCallback<Params, Payload, Result>,
  after?: After<Params, Payload, Result>,
): PutFunc<Params, Payload, Result> {
  const { mutate } = useSWRConfig()
  const { requestSettings } = useRequestSettings()
  const { setWorkflow, removeWorkflow } = useWorkflows()
  const hookArgs = mergeInternalHookArgsCallback(args)
  return {
    put: async (args: InternalCallbackArgs<Params, Payload, Result>) => {
      const callArgs = mergeInternalCallbackArgs(args)
      try {
        const reqConfig = buildAxiosConfig(requestSettings, hookArgs, callArgs)
        const reqRoute = buildRouteWithParams(
          requestSettings,
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

        const key = getKey('put', reqRoute, args as { payload: Payload })

        const route = getRouteFromKey(
          requestSettings,
          key,
          args,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callArgs as any,
        )
        const workflowKey = key.join('')
        setWorkflow(workflowKey, {
          route,
          payload,
        })
        const response = await axios.put<Result>(reqRoute, payload, reqConfig)
        if (after) {
          await after(
            (matcher, data = (d) => d, opts) =>
              buildMutateMatcherFn(
                mutate,
                requestSettings,
                args,
                callArgs,
                matcher,
                data,
                opts,
              ),
            callArgs,
            response,
          )
        }
        removeWorkflow(workflowKey)
        return {
          status: response.status,
          data: response.data,
          headers: response.headers,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
