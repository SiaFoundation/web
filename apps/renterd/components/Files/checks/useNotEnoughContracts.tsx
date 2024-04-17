import { useSettingRedundancy } from '@siafoundation/renterd-react'
import { useContracts } from '../../../contexts/contracts'

export function useNotEnoughContracts() {
  const redundancy = useSettingRedundancy()
  const { datasetCount, isLoading: isContractsLoading } = useContracts()

  const active =
    redundancy.data &&
    !isContractsLoading &&
    datasetCount < redundancy.data.totalShards

  return {
    active,
    count: datasetCount,
    required: redundancy.data?.totalShards || 0,
  }
}
