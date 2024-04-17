import { useSettingContractSet } from '@siafoundation/renterd-react'

export function useDefaultContractSetNotSet() {
  const css = useSettingContractSet()

  return {
    active: css.data && !css.data?.default,
  }
}
