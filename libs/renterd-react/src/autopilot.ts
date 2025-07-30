import {
  useGetSwr,
  usePostSwr,
  HookArgsSwr,
  HookArgsCallback,
  HookArgsWithPayloadSwr,
  usePostFunc,
} from '@siafoundation/react-core'
import {
  AutopilotConfigEvaluateParams,
  AutopilotConfigEvaluatePayload,
  AutopilotConfigEvaluateResponse,
  AutopilotStateParams,
  AutopilotStateResponse,
  AutopilotTriggerParams,
  AutopilotTriggerPayload,
  AutopilotTriggerResponse,
  autopilotStateRoute,
  autopilotTriggerRoute,
  autopilotConfigEvaluateRoute,
} from '@siafoundation/renterd-types'

export function useAutopilotState(
  args?: HookArgsSwr<AutopilotStateParams, AutopilotStateResponse>,
) {
  return useGetSwr({
    ...args,
    route: autopilotStateRoute,
  })
}

export function useAutopilotConfigEvaluate(
  args: HookArgsWithPayloadSwr<
    AutopilotConfigEvaluateParams,
    AutopilotConfigEvaluatePayload,
    AutopilotConfigEvaluateResponse
  >,
) {
  return usePostSwr({ ...args, route: autopilotConfigEvaluateRoute })
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
