import {
  useAdminContracts,
  useAdminSettingsContracts,
} from '@siafoundation/indexd-react'

export function useNotEnoughContracts() {
  const settingsContracts = useAdminSettingsContracts()
  // TODO: active contracts
  const contracts = useAdminContracts()

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
