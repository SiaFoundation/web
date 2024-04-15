import { AutopilotConfig, Host } from './types'
import { HostsSearchPayload, BusStateResponse } from './bus'

export const autopilotStateRoute = '/autopilot/state'
export const autopilotConfigRoute = '/autopilot/config'
export const autopilotHostsRoute = '/autopilot/hosts'
export const autopilotTriggerRoute = '/autopilot/trigger'

type AutopilotStatus = {
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

export type AutopilotHost = {
  host: Host
  checks?: {
    score: number
    scoreBreakdown: {
      age: number
      collateral: number
      interactions: number
      storageRemaining: number
      prices: number
      uptime: number
      version: number
    }
    unusableReasons: string[]
    gougingBreakdown: {
      contractErr?: string
      downloadErr?: string
      gougingErr?: string
      uploadErr?: string
    }
    gouging: boolean
    usable: boolean
  }
}

export type AutopilotHostsSearchParams = void
export type AutopilotHostsSearchPayload = HostsSearchPayload
export type AutopilotHostsSearchResponse = AutopilotHost[]

export type AutopilotTriggerParams = void
export type AutopilotTriggerPayload = { forceScan: boolean }
export type AutopilotTriggerResponse = { triggered: boolean }
