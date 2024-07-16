import {
  type HookArgsCallback,
  type HookArgsSwr,
  type HookArgsWithPayloadSwr,
  delay,
  useGetSwr,
  usePostFunc,
  usePostSwr,
  usePutFunc,
} from '@siafoundation/react-core'
import {
  type AutopilotConfigEvaluateParams,
  type AutopilotConfigEvaluatePayload,
  type AutopilotConfigEvaluateResponse,
  type AutopilotConfigParams,
  type AutopilotConfigResponse,
  type AutopilotConfigUpdateParams,
  type AutopilotConfigUpdatePayload,
  type AutopilotConfigUpdateResponse,
  type AutopilotHostsSearchParams,
  type AutopilotHostsSearchPayload,
  type AutopilotHostsSearchResponse,
  type AutopilotStateParams,
  type AutopilotStateResponse,
  type AutopilotTriggerParams,
  type AutopilotTriggerPayload,
  type AutopilotTriggerResponse,
  autopilotConfigRoute,
  autopilotHostsRoute,
  autopilotStateRoute,
  autopilotTriggerRoute,
} from '@siafoundation/renterd-types'

export function useAutopilotState(
  args?: HookArgsSwr<AutopilotStateParams, AutopilotStateResponse>,
) {
  return useGetSwr({
    ...args,
    route: autopilotStateRoute,
  })
}

export function useAutopilotConfig(
  args?: HookArgsSwr<AutopilotConfigParams, AutopilotConfigResponse>,
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
  >,
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
    },
  )
}

export function useAutopilotConfigEvaluate(
  args: HookArgsWithPayloadSwr<
    AutopilotConfigEvaluateParams,
    AutopilotConfigEvaluatePayload,
    AutopilotConfigEvaluateResponse
  >,
) {
  return usePostSwr({ ...args, route: autopilotConfigRoute })
}

export function useAutopilotHostsSearch(
  args?: HookArgsWithPayloadSwr<
    AutopilotHostsSearchParams,
    AutopilotHostsSearchPayload,
    AutopilotHostsSearchResponse
  >,
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
  >,
) {
  return usePostFunc({
    ...args,
    route: autopilotTriggerRoute,
  })
}
