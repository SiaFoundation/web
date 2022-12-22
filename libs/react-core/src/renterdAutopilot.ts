import { useGet } from './useGet'
import { SWROptions } from './types'
import { Action, Config } from './siaTypes'
import { usePut } from './usePut'

export function useAutopilotConfig(options?: SWROptions<Config>) {
  return useGet<Config>(null, 'autopilot/config', options)
}

export function useAutopilotConfigUpdate() {
  return usePut<undefined, Config, never>('autopilot/config', [
    'autopilot/config',
  ])
}

export function useAutopilotActions(
  params: { since: Date; max: number },
  options?: SWROptions<Action[]>
) {
  return useGet<Action[]>(params, 'autopilot/status', options)
}

export function useAutopilotStatus(
  options?: SWROptions<{ currentPeriod: number }>
) {
  return useGet<{ currentPeriod: number }>(null, 'autopilot/status', options)
}
