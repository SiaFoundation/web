import {
  type AutopilotConfigEvaluateParams,
  type AutopilotConfigEvaluatePayload,
  type AutopilotConfigEvaluateResponse,
  type AutopilotConfigParams,
  type AutopilotConfigPayload,
  type AutopilotConfigResponse,
  type AutopilotConfigUpdateParams,
  type AutopilotConfigUpdatePayload,
  type AutopilotConfigUpdateResponse,
  type AutopilotHostsSearchParams,
  type AutopilotHostsSearchPayload,
  type AutopilotHostsSearchResponse,
  type AutopilotStateParams,
  type AutopilotStatePayload,
  type AutopilotStateResponse,
  type AutopilotTriggerParams,
  type AutopilotTriggerPayload,
  type AutopilotTriggerResponse,
  autopilotConfigRoute,
  autopilotHostsRoute,
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
    hostsSearch: buildRequestHandler<
      AutopilotHostsSearchParams,
      AutopilotHostsSearchPayload,
      AutopilotHostsSearchResponse
    >(axios, 'post', autopilotHostsRoute),
    trigger: buildRequestHandler<
      AutopilotTriggerParams,
      AutopilotTriggerPayload,
      AutopilotTriggerResponse
    >(axios, 'post', autopilotTriggerRoute),
  }
}
