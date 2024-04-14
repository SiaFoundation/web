import { useAutopilotConfig } from '@siafoundation/renterd-react'
import { useApp } from '../../../contexts/app'

export function useAutopilotNotConfigured() {
  const { autopilot } = useApp()
  const apc = useAutopilotConfig({
    config: {
      swr: {
        errorRetryCount: 0,
      },
    },
  })

  return {
    active: autopilot.status === 'on' && !!apc.error,
  }
}
