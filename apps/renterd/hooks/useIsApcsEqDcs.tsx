import {
  useAutopilotConfig,
  useSettingsUpload,
} from '@siafoundation/renterd-react'
import { useApp } from '../contexts/app'

// is the autopilot contract set the same as the default contract set
export function useIsApcsEqDcs() {
  const { autopilot } = useApp()
  const apc = useAutopilotConfig({
    disabled: autopilot.status !== 'on',
  })
  const su = useSettingsUpload()

  return {
    isValidating: apc.isValidating || su.isValidating,
    data: apc.data?.contracts.set === su.data?.defaultContractSet,
  }
}
