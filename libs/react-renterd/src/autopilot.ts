import { Action, AutopilotConfig, Host } from './siaTypes'
import { HostsSearchPayload } from './bus'
import {
  useGetSwr,
  usePostSwr,
  usePutFunc,
  HookArgsSwr,
  HookArgsCallback,
  HookArgsWithPayloadSwr,
} from '@siafoundation/react-core'

const autopilotConfigKey = '/autopilot/config'
export function useAutopilotConfig(args?: HookArgsSwr<void, AutopilotConfig>) {
  return useGetSwr({
    ...args,
    route: autopilotConfigKey,
  })
}

export function useAutopilotConfigUpdate(
  args?: HookArgsCallback<void, AutopilotConfig, void>
) {
  return usePutFunc({ ...args, route: autopilotConfigKey }, async (mutate) => {
    mutate((key) => key === autopilotConfigKey)
  })
}

export function useAutopilotActions(
  args?: HookArgsSwr<{ since?: number; max?: number }, Action[]>
) {
  return useGetSwr({
    ...args,
    route: '/autopilot/actions',
  })
}

export function useAutopilotStatus(
  args?: HookArgsSwr<void, { currentPeriod: number }>
) {
  return useGetSwr({
    ...args,
    route: '/autopilot/status',
  })
}

export type AutopilotHost = {
  host: Host
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
    v2: {
      contractErr?: string
      downloadErr?: string
      gougingErr?: string
      uploadErr?: string
    }
    v3: {
      contractErr?: string
      downloadErr?: string
      gougingErr?: string
      uploadErr?: string
    }
  }
  gouging: boolean
  usable: boolean
}

export function useAutopilotHostsSearch(
  args?: HookArgsWithPayloadSwr<void, HostsSearchPayload, AutopilotHost[]>
) {
  return usePostSwr({
    ...args,
    route: '/autopilot/hosts',
  })
}
