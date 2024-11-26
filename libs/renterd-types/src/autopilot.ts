import { BuildState } from './bus'
import { AutopilotConfig, SettingsGouging, SettingsRedundancy } from './types'

export const autopilotStateRoute = '/autopilot/state'
export const autopilotConfigEvaluateRoute = '/autopilot/config/evaluate'
export const autopilotTriggerRoute = '/autopilot/trigger'
export const busAutopilotRoute = '/bus/autopilot'

type AutopilotStatus = {
  id: string
  configured: boolean
  migrating: boolean
  migratingLastStart: string
  pruning: boolean
  pruningLastStart: string
  scanning: boolean
  scanningLastStart: string
  uptimeMS: string
  startTime: number
}

export type AutopilotState = AutopilotStatus & BuildState

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
  gougingSettings: SettingsGouging
}

export type AutopilotConfigEvaluateParams = void
export type AutopilotConfigEvaluatePayload = {
  autopilotConfig: AutopilotConfig
  gougingSettings: SettingsGouging
  redundancySettings: SettingsRedundancy
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
