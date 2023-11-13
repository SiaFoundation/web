import { useContracts } from '../../../contexts/contracts'
import { useRedundancySettings } from '../../../hooks/useRedundancySettings'

export function useNotEnoughContracts() {
  const redundancy = useRedundancySettings()
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
