import {
  useAdminSettingsContracts,
  useAdminStatsHosts,
} from '@siafoundation/indexd-react'

export function useNotEnoughContracts() {
  const settingsContracts = useAdminSettingsContracts()
  const statsHosts = useAdminStatsHosts()

  const active =
    settingsContracts.data &&
    statsHosts.data &&
    statsHosts.data.active < settingsContracts.data.wantedContracts

  return {
    active,
    count: statsHosts.data?.active || 0,
    required: settingsContracts.data?.wantedContracts || 0,
  }
}
