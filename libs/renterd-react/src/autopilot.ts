import {
  useGetSwr,
  usePostSwr,
  usePutFunc,
  HookArgsSwr,
  HookArgsCallback,
  HookArgsWithPayloadSwr,
  delay,
  usePostFunc,
} from '@siafoundation/react-core'
import {
  AutopilotConfigParams,
  AutopilotConfigResponse,
  AutopilotConfigUpdateParams,
  AutopilotConfigUpdatePayload,
  AutopilotConfigUpdateResponse,
  AutopilotConfigEvaluateParams,
  AutopilotConfigEvaluatePayload,
  AutopilotConfigEvaluateResponse,
  AutopilotHostsSearchParams,
  AutopilotHostsSearchPayload,
  AutopilotHostsSearchResponse,
  AutopilotStateParams,
  AutopilotStateResponse,
  AutopilotTriggerParams,
  AutopilotTriggerPayload,
  AutopilotTriggerResponse,
  autopilotConfigRoute,
  autopilotHostsRoute,
  autopilotStateRoute,
  autopilotTriggerRoute,
} from '@siafoundation/renterd-types'

export function useAutopilotState(
  args?: HookArgsSwr<AutopilotStateParams, AutopilotStateResponse>
) {
  return useGetSwr({
    ...args,
    route: autopilotStateRoute,
  })
}

export function useAutopilotConfig(
  args?: HookArgsSwr<AutopilotConfigParams, AutopilotConfigResponse>
) {
  return useGetSwr({
    ...args,
    route: autopilotConfigRoute,
  })
}

export function useAutopilotConfigUpdate(
  args?: HookArgsCallback<
    AutopilotConfigUpdateParams,
    AutopilotConfigUpdatePayload,
    AutopilotConfigUpdateResponse
  >
) {
  return usePutFunc(
    { ...args, route: autopilotConfigRoute },
    async (mutate) => {
      mutate((key) => key === autopilotConfigRoute)
      // might need a delay before revalidating status which returns whether
      // or not autopilot is configured
      const func = async () => {
        await delay(1000)
        mutate((key) => key === autopilotStateRoute)
      }
      func()
    }
  )
}

export function useAutopilotConfigEvaluate(
  args?: HookArgsCallback<
    AutopilotConfigEvaluateParams,
    AutopilotConfigEvaluatePayload,
    AutopilotConfigEvaluateResponse
  >
) {
  return usePostFunc({ ...args, route: autopilotConfigRoute })
}

export function useAutopilotHostsSearch(
  args?: HookArgsWithPayloadSwr<
    AutopilotHostsSearchParams,
    AutopilotHostsSearchPayload,
    AutopilotHostsSearchResponse
  >
) {
  return usePostSwr({
    ...args,
    route: autopilotHostsRoute,
  })
}

export function useAutopilotTrigger(
  args?: HookArgsCallback<
    AutopilotTriggerParams,
    AutopilotTriggerPayload,
    AutopilotTriggerResponse
  >
) {
  return usePostFunc({
    ...args,
    route: autopilotTriggerRoute,
  })
}
