import { useSettingsUpload } from '@siafoundation/renterd-react'

export function useDefaultContractSetNotSet() {
  const su = useSettingsUpload()

  return {
    active: su.data && !su.data?.defaultContractSet,
  }
}
