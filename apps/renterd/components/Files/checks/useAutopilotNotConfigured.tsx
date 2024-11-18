import { useAutopilotState } from '@siafoundation/renterd-react'

export function useAutopilotNotConfigured() {
  const autopilotState = useAutopilotState()
  return {
    active: !autopilotState.data?.configured,
  }
}
