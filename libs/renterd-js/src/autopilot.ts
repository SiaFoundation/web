import {
  AutopilotConfigEvaluateParams,
  AutopilotConfigEvaluatePayload,
  AutopilotConfigEvaluateResponse,
  AutopilotConfigParams,
  AutopilotConfigPayload,
  AutopilotConfigResponse,
  AutopilotConfigUpdateParams,
  AutopilotConfigUpdatePayload,
  AutopilotConfigUpdateResponse,
  AutopilotStateParams,
  AutopilotStatePayload,
  AutopilotStateResponse,
  AutopilotTriggerParams,
  AutopilotTriggerPayload,
  AutopilotTriggerResponse,
  autopilotConfigRoute,
  autopilotStateRoute,
  autopilotTriggerRoute,
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
    config: buildRequestHandler<
      AutopilotConfigParams,
      AutopilotConfigPayload,
      AutopilotConfigResponse
    >(axios, 'get', autopilotConfigRoute),
    configUpdate: buildRequestHandler<
      AutopilotConfigUpdateParams,
      AutopilotConfigUpdatePayload,
      AutopilotConfigUpdateResponse
    >(axios, 'put', autopilotConfigRoute),
    configEvaluate: buildRequestHandler<
      AutopilotConfigEvaluateParams,
      AutopilotConfigEvaluatePayload,
      AutopilotConfigEvaluateResponse
    >(axios, 'post', autopilotConfigRoute),
    trigger: buildRequestHandler<
      AutopilotTriggerParams,
      AutopilotTriggerPayload,
      AutopilotTriggerResponse
    >(axios, 'post', autopilotTriggerRoute),
  }
}
