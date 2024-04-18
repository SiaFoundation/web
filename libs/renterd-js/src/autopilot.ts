import {
  AutopilotConfigParams,
  AutopilotConfigPayload,
  AutopilotConfigResponse,
  AutopilotConfigUpdateParams,
  AutopilotConfigUpdatePayload,
  AutopilotConfigUpdateResponse,
  AutopilotHostsSearchParams,
  AutopilotHostsSearchPayload,
  AutopilotHostsSearchResponse,
  AutopilotStateParams,
  AutopilotStatePayload,
  AutopilotStateResponse,
  AutopilotTriggerParams,
  AutopilotTriggerPayload,
  AutopilotTriggerResponse,
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
    confg: buildRequestHandler<
      AutopilotConfigParams,
      AutopilotConfigPayload,
      AutopilotConfigResponse
    >(axios, 'get', autopilotConfigRoute),
    configUpdate: buildRequestHandler<
      AutopilotConfigUpdateParams,
      AutopilotConfigUpdatePayload,
      AutopilotConfigUpdateResponse
    >(axios, 'put', autopilotConfigRoute),
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
