import axios from 'axios'
import { useSWRConfig } from 'swr'
import {
  buildAxiosConfig,
  buildRouteWithParams,
  InternalCallbackArgs,
  mergeInternalCallbackArgs,
  RequestParams,
  Response,
  InternalHookArgsCallback,
  mergeInternalHookArgsCallback,
  After,
  getPathFromKey,
} from './request'
import { useAppSettings } from './useAppSettings'

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
  const { settings } = useAppSettings()
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
          callArgs
        )
        if (!reqRoute) {
          throw Error('No route')
        }
        const response = await axios.delete<Result>(reqRoute, reqConfig)
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
