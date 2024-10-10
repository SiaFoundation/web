import { useApp } from '../../../contexts/app'

export function useAutopilotNotConfigured() {
  const { autopilotInfo } = useApp()
  return {
    active:
      autopilotInfo.data?.isAutopilotEnabled &&
      !autopilotInfo.data?.state?.configured,
  }
}
