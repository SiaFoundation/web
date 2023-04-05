import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { useMemo } from 'react'
import {
  buildAxiosConfig,
  buildRouteWithParams,
  InternalCallbackArgs,
  mergeInternalCallbackArgs,
  RequestParams,
  Response,
  InternalHookArgsCallback,
  mergeInternalHookArgsCallback,
  mergeInternalHookArgsSwr,
  InternalHookArgsWithPayloadSwr,
  getPathFromKey,
  After,
} from './request'
import { SWRError } from './types'
import { useAppSettings } from './useAppSettings'
import { keyOrNull } from './utils'
import { useWorkflows } from './workflows'

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
  const key = useMemo(
    () =>
      keyOrNull(
        reqRoute
          ? `${reqRoute}${JSON.stringify(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (args as any).payload !== undefined ? (args as any).payload : ''
            )}`
          : null,
        hookArgs.disabled || (passwordProtectRequestHooks && !settings.password)
      ),
    [reqRoute, args, hookArgs, passwordProtectRequestHooks, settings]
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
  after?: After<Params, Payload, Result>
): PostFunc<Params, Payload, Result> {
  const { setWorkflow, removeWorkflow } = useWorkflows()
  const { mutate } = useSWRConfig()
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

        const key = `${reqRoute}${JSON.stringify(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (args as any).payload !== undefined ? (args as any).payload : ''
        )}`

        const path = getPathFromKey(
          settings,
          reqRoute,
          args,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callArgs as any
        )

        setWorkflow(key, {
          path,
          payload,
        })
        const response = await axios.post<Result>(reqRoute, payload, reqConfig)
        if (after) {
          after(
            (matcher, data, opts) =>
              mutate(
                (key) => {
                  if (typeof key !== 'string') {
                    return false
                  }
                  const route = getPathFromKey(
                    settings,
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
        removeWorkflow(key)
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
