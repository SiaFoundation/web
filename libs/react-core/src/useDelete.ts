'use client'

import axios from 'axios'
import { useSWRConfig } from 'swr'
import { useWorkflows } from './workflows'
import {
  buildAxiosConfig,
  buildRouteWithParams,
  InternalCallbackArgs,
  mergeInternalCallbackArgs,
  Response,
  InternalHookArgsCallback,
  mergeInternalHookArgsCallback,
  After,
  getPathFromKey,
} from './request'
import { RequestParams } from '@siafoundation/request'
import { useRequestSettings } from './appSettings/useRequestSettings'

type DeleteFunc<Params extends RequestParams, Result> = {
  delete: (
    args: InternalCallbackArgs<Params, undefined, Result>
  ) => Promise<Response<Result>>
}

export function useDeleteFunc<Params extends RequestParams, Result>(
  args: InternalHookArgsCallback<Params, void, Result>,
  after?: After<Params, void, Result>
): DeleteFunc<Params, Result> {
  const { mutate } = useSWRConfig()
  const { requestSettings } = useRequestSettings()
  const { setWorkflow, removeWorkflow } = useWorkflows()
  const hookArgs = mergeInternalHookArgsCallback(args)
  return {
    delete: async (args: InternalCallbackArgs<Params, void, Result>) => {
      const callArgs = mergeInternalCallbackArgs(args)
      try {
        const reqConfig = buildAxiosConfig(requestSettings, hookArgs, callArgs)
        const reqRoute = buildRouteWithParams(
          requestSettings,
          hookArgs.route,
          hookArgs,
          callArgs
        )
        if (!reqRoute) {
          throw Error('No route')
        }
        const path = getPathFromKey(
          requestSettings,
          reqRoute,
          args,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callArgs as any
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
                    requestSettings,
                    key,
                    args,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    callArgs as any
                  )
                  return matcher(route)
                },
                data,
                opts
              ),
            callArgs,
            response
          )
        }
        removeWorkflow(reqRoute)
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
