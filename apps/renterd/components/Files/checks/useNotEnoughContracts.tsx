import { useContracts } from '../../../contexts/contracts'
import { useRedundancySettings } from '../../../hooks/useRedundancySettings'

export function useNotEnoughContracts() {
  const redundancy = useRedundancySettings({
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })
  const { datasetCount } = useContracts()

  const active = redundancy.data && datasetCount < redundancy.data.totalShards

  return {
    active,
    count: datasetCount,
    required: redundancy.data?.totalShards || 0,
  }
}
