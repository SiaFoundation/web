import { AutopilotConfig, GougingSettings, RedundancySettings } from './types'
import { BusStateResponse } from './bus'

export const autopilotStateRoute = '/autopilot/state'
export const autopilotConfigRoute = '/autopilot/config'
export const autopilotTriggerRoute = '/autopilot/trigger'

type AutopilotStatus = {
  id: string
  configured: boolean
  migrating: boolean
  migratingLastStart: string
  scanning: boolean
  scanningLastStart: string
  synced: boolean
  uptimeMS: string
}

export type AutopilotState = AutopilotStatus & BusStateResponse

export type AutopilotStateParams = void
export type AutopilotStatePayload = void
export type AutopilotStateResponse = AutopilotState

export type AutopilotConfigParams = void
export type AutopilotConfigPayload = void
export type AutopilotConfigResponse = AutopilotConfig

export type AutopilotConfigUpdateParams = void
export type AutopilotConfigUpdatePayload = AutopilotConfig
export type AutopilotConfigUpdateResponse = void

export type ConfigRecommendation = {
  gougingSettings: GougingSettings
}

export type AutopilotConfigEvaluateParams = void
export type AutopilotConfigEvaluatePayload = {
  autopilotConfig: AutopilotConfig
  gougingSettings: GougingSettings
  redundancySettings: RedundancySettings
}
export type AutopilotConfigEvaluateResponse = {
  hosts: number
  usable: number
  unusable: {
    blocked: number
    gouging: {
      contract: number
      download: number
      gouging: number
      pruning: number
      upload: number
    }
    notAcceptingContracts: number
    notScanned: number
  }
  recommendation?: ConfigRecommendation
}

export type AutopilotTriggerParams = void
export type AutopilotTriggerPayload = { forceScan: boolean }
export type AutopilotTriggerResponse = { triggered: boolean }
