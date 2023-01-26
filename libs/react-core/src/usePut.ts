import axios from 'axios'
import {
  buildAxiosConfig,
  buildRoute,
  InternalCallbackArgs,
  InternalHookArgsCallback,
  mergeInternalCallbackArgs,
  RequestParams,
  Response,
  triggerDeps,
  mergeInternalHookArgsCallback,
} from './request'
import { useAppSettings } from './useAppSettings'

type Put<Params extends RequestParams, Payload, Result> = {
  put: (
    args: InternalCallbackArgs<Params, Payload, Result>
  ) => Promise<Response<Result>>
}

export function usePut<Params extends RequestParams, Payload, Result>(
  args: InternalHookArgsCallback<Params, Payload, Result>,
  deps: string[]
): Put<Params, Payload, Result> {
  const { settings } = useAppSettings()
  const hookArgs = mergeInternalHookArgsCallback(args)
  return {
    put: async (args: InternalCallbackArgs<Params, Payload, Result>) => {
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
        let payload: Payload | undefined = undefined
        if ('payload' in callArgs) {
          payload = callArgs.payload
        }
        const response = await axios.put<Result>(reqRoute, payload, reqConfig)
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
