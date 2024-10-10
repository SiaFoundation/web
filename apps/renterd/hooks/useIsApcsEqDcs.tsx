import {
  useAutopilotConfig,
  useSettingsUpload,
} from '@siafoundation/renterd-react'
import { useApp } from '../contexts/app'

// Is the autopilot contract set the same as the default contract set.
export function useIsApcsEqDcs() {
  const { isAutopilotEnabled } = useApp()
  const apc = useAutopilotConfig({
    disabled: !isAutopilotEnabled,
  })
  const su = useSettingsUpload()

  return {
    isValidating: apc.isValidating || su.isValidating,
    data: apc.data?.contracts.set === su.data?.defaultContractSet,
  }
}
