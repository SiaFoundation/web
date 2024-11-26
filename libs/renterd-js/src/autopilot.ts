import {
  AutopilotConfigEvaluateParams,
  AutopilotConfigEvaluatePayload,
  AutopilotConfigEvaluateResponse,
  AutopilotStateParams,
  AutopilotStatePayload,
  AutopilotStateResponse,
  AutopilotTriggerParams,
  AutopilotTriggerPayload,
  AutopilotTriggerResponse,
  autopilotStateRoute,
  autopilotTriggerRoute,
  autopilotConfigEvaluateRoute,
} from '@siafoundation/renterd-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function Autopilot({
  api,
  password,
}: {
  api: string
  password?: string
}) {
  const axios = initAxios(api, password)
  return {
    axios,
    state: buildRequestHandler<
      AutopilotStateParams,
      AutopilotStatePayload,
      AutopilotStateResponse
    >(axios, 'get', autopilotStateRoute),
    configEvaluate: buildRequestHandler<
      AutopilotConfigEvaluateParams,
      AutopilotConfigEvaluatePayload,
      AutopilotConfigEvaluateResponse
    >(axios, 'post', autopilotConfigEvaluateRoute),
    trigger: buildRequestHandler<
      AutopilotTriggerParams,
      AutopilotTriggerPayload,
      AutopilotTriggerResponse
    >(axios, 'post', autopilotTriggerRoute),
  }
}
