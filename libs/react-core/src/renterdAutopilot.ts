import { useGetSwr } from './useGet'
import { Action, Config } from './siaTypes'
import { usePutFunc } from './usePut'
import { HookArgsSwr, HookArgsCallback } from './request'

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
  return usePutFunc({ ...args, route: autopilotConfigKey }, [
    (key) => key === autopilotConfigKey,
  ])
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
