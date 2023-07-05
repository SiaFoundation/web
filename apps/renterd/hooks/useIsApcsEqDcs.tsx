import { useAutopilotConfig } from '@siafoundation/react-renterd'
import { useAutopilot } from './useAutopilot'
import { useContractSetSettings } from './useContractSetSettings'

// is the autopilot contract set the same as the default contract set
export function useIsApcsEqDcs() {
  const ap = useAutopilot()
  const apc = useAutopilotConfig({
    disabled: ap !== 'on',
  })
  const css = useContractSetSettings()

  return {
    isValidating: apc.isValidating || css.isValidating,
    data: apc.data?.contracts.set === css.data?.default,
  }
}
