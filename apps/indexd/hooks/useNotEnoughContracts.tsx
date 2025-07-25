import { useContracts, useSettingsContracts } from '@siafoundation/indexd-react'

export function useNotEnoughContracts() {
  const settingsContracts = useSettingsContracts()
  // TODO: active contracts
  const contracts = useContracts()

  const active =
    settingsContracts.data &&
    contracts.data &&
    contracts.data.length < settingsContracts.data.wantedContracts

  return {
    active,
    count: contracts.data?.length || 0,
    required: settingsContracts.data?.wantedContracts || 0,
  }
}
