import { useGet } from './useGet'
import { Action, Config } from './siaTypes'
import { usePut } from './usePut'
import { HookArgsSwr, HookArgsCallback } from './request'

const autopilotConfigKey = '/autopilot/config'
export function useAutopilotConfig(args?: HookArgsSwr<void, Config>) {
  return useGet({
    ...args,
    route: autopilotConfigKey,
  })
}

export function useAutopilotConfigUpdate(
  args?: HookArgsCallback<void, Config, void>
) {
  return usePut({ ...args, route: autopilotConfigKey }, [
    (key) => key === autopilotConfigKey,
  ])
}

export function useAutopilotActions(
  args?: HookArgsSwr<{ since?: number; max?: number }, Action[]>
) {
  return useGet({
    ...args,
    route: '/autopilot/actions',
  })
}

export function useAutopilotStatus(
  args?: HookArgsSwr<void, { currentPeriod: number }>
) {
  return useGet({
    ...args,
    route: '/autopilot/status',
  })
}
