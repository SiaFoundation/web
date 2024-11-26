import { useAutopilotConfig } from '@siafoundation/renterd-react'

export function useAutopilotNotEnabled() {
  const autopilotConfig = useAutopilotConfig()
  return {
    active: !autopilotConfig.data?.enabled,
  }
}
