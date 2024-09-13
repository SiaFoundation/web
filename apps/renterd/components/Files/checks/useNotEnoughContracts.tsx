import { useSettingsUpload } from '@siafoundation/renterd-react'
import { useContracts } from '../../../contexts/contracts'

export function useNotEnoughContracts() {
  const settingsUpload = useSettingsUpload()
  const { datasetCount, isLoading: isContractsLoading } = useContracts()

  const active =
    settingsUpload.data &&
    !isContractsLoading &&
    datasetCount < settingsUpload.data.redundancy.totalShards

  return {
    active,
    count: datasetCount,
    required: settingsUpload.data?.redundancy.totalShards || 0,
  }
}
