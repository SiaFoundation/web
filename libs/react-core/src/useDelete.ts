import axios from 'axios'
import {
  buildAxiosConfig,
  buildRoute,
  InternalCallbackArgs,
  mergeInternalCallbackArgs,
  RequestParams,
  Response,
  triggerDeps,
  InternalHookArgsCallback,
  mergeInternalHookArgsCallback,
} from './request'
import { useAppSettings } from './useAppSettings'

type Delete<Params extends RequestParams, Result> = {
  delete: (
    args: InternalCallbackArgs<Params, undefined, Result>
  ) => Promise<Response<Result>>
}

export function useDelete<Params extends RequestParams, Result>(
  args: InternalHookArgsCallback<Params, void, Result>,
  deps: string[]
): Delete<Params, Result> {
  const { settings } = useAppSettings()
  const hookArgs = mergeInternalHookArgsCallback(args)
  return {
    delete: async (args: InternalCallbackArgs<Params, void, Result>) => {
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
        const response = await axios.delete<Result>(reqRoute, reqConfig)
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
