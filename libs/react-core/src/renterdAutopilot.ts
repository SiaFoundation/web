import { useGetSwr } from './useGet'
import { Action, Config, Host } from './siaTypes'
import { usePutFunc } from './usePut'
import {
  HookArgsSwr,
  HookArgsCallback,
  HookArgsWithPayloadSwr,
} from './request'
import { usePostSwr } from './usePost'
import { HostsSearchPayload } from './renterdBus'

const autopilotConfigKey = '/autopilot/config'
export function useAutopilotConfig(args?: HookArgsSwr<void, Config>) {
  return useGetSwr({
    ...args,
    route: autopilotConfigKey,
  })
}

export function useAutopilotConfigUpdate(
  args?: HookArgsCallback<void, Config, void>
) {
  return usePutFunc({ ...args, route: autopilotConfigKey }, (mutate) => {
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
      contractErr: string
      downloadErr: string
      gougingErr: string
      uploadErr: string
    }
    v3: {
      contractErr: string
      downloadErr: string
      gougingErr: string
      uploadErr: string
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
