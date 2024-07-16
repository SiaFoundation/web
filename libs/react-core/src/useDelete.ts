'use client'

import type { RequestParams } from '@siafoundation/request'
import axios from 'axios'
import { useSWRConfig } from 'swr'
import {
  type After,
  type InternalCallbackArgs,
  type InternalHookArgsCallback,
  type Response,
  buildAxiosConfig,
  buildRouteWithParams,
  getPathFromKey,
  mergeInternalCallbackArgs,
  mergeInternalHookArgsCallback,
} from './request'
import { useAppSettings } from './useAppSettings'
import { useWorkflows } from './workflows'

type DeleteFunc<Params extends RequestParams, Result> = {
  delete: (
    args: InternalCallbackArgs<Params, undefined, Result>,
  ) => Promise<Response<Result>>
}

export function useDeleteFunc<Params extends RequestParams, Result>(
  args: InternalHookArgsCallback<Params, void, Result>,
  after?: After<Params, void, Result>,
): DeleteFunc<Params, Result> {
  const { mutate } = useSWRConfig()
  const { settings } = useAppSettings()
  const { setWorkflow, removeWorkflow } = useWorkflows()
  const hookArgs = mergeInternalHookArgsCallback(args)
  return {
    delete: async (args: InternalCallbackArgs<Params, void, Result>) => {
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
        const path = getPathFromKey(
          settings,
          reqRoute,
          args,
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          callArgs as any,
        )
        setWorkflow(reqRoute, {
          path,
        })
        const response = await axios.delete<Result>(reqRoute, reqConfig)
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
        removeWorkflow(reqRoute)
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
