import { useSettingsUpload } from '@siafoundation/renterd-react'
import { useContracts } from '../../../contexts/contracts'

export function useNotEnoughContracts() {
  const settingsUpload = useSettingsUpload()
  const { datasetTotal, isLoading: isContractsLoading } = useContracts()

  const active =
    settingsUpload.data &&
    !isContractsLoading &&
    datasetTotal < settingsUpload.data.redundancy.totalShards

  return {
    active,
    count: datasetTotal,
    required: settingsUpload.data?.redundancy.totalShards || 0,
  }
}
