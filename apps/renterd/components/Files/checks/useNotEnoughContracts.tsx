import { useContracts } from '../../../contexts/contracts'
import { useRedundancySettings } from '../../../hooks/useRedundancySettings'

export function useNotEnoughContracts() {
  const redundancy = useRedundancySettings()
  const { datasetConfirmedCount, isLoading: isContractsLoading } =
    useContracts()

  const active =
    redundancy.data &&
    !isContractsLoading &&
    datasetConfirmedCount < redundancy.data.totalShards

  return {
    active,
    count: datasetConfirmedCount,
    required: redundancy.data?.totalShards || 0,
  }
}
