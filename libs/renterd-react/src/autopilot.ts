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
  AutopilotHostsSearchParams,
  AutopilotHostsSearchPayload,
  AutopilotHostsSearchResponse,
  AutopilotStateParams,
  AutopilotStateResponse,
  AutopilotTriggerParams,
  AutopilotTriggerPayload,
  AutopilotTriggerResponse,
} from '@siafoundation/renterd-types'

const autopilotStateKey = '/autopilot/state'

export function useAutopilotState(
  args?: HookArgsSwr<AutopilotStateParams, AutopilotStateResponse>
) {
  return useGetSwr({
    ...args,
    route: autopilotStateKey,
  })
}

const autopilotConfigKey = '/autopilot/config'
export function useAutopilotConfig(
  args?: HookArgsSwr<AutopilotConfigParams, AutopilotConfigResponse>
) {
  return useGetSwr({
    ...args,
    route: autopilotConfigKey,
  })
}

export function useAutopilotConfigUpdate(
  args?: HookArgsCallback<
    AutopilotConfigUpdateParams,
    AutopilotConfigUpdatePayload,
    AutopilotConfigUpdateResponse
  >
) {
  return usePutFunc({ ...args, route: autopilotConfigKey }, async (mutate) => {
    mutate((key) => key === autopilotConfigKey)
    // might need a delay before revalidating status which returns whether
    // or not autopilot is configured
    const func = async () => {
      await delay(1000)
      mutate((key) => key === autopilotStateKey)
    }
    func()
  })
}

export const autopilotHostsKey = '/autopilot/hosts'

export function useAutopilotHostsSearch(
  args?: HookArgsWithPayloadSwr<
    AutopilotHostsSearchParams,
    AutopilotHostsSearchPayload,
    AutopilotHostsSearchResponse
  >
) {
  return usePostSwr({
    ...args,
    route: autopilotHostsKey,
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
    route: '/autopilot/trigger',
  })
}
