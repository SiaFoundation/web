import { useContracts as useContractsData } from '@siafoundation/renterd-react'
import { useSiaCentralHosts } from '@siafoundation/sia-central-react'
import { blockHeightToTime } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import type { ContractData, ContractDataWithoutPrunable } from './types'
import { usePrunableContractSizes } from './usePrunableContractSizes'

export function useDataset({
  selectContract,
  autopilotContractSet,
  defaultContractSet,
}: {
  selectContract: (id: string) => void
  autopilotContractSet?: string
  defaultContractSet?: string
}) {
  const response = useContractsData({
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })
  const geo = useSiaCentralHosts()
  const geoHosts = useMemo(() => geo.data?.hosts || [], [geo.data])

  const syncStatus = useSyncStatus()
  const currentHeight = syncStatus.isSynced
    ? syncStatus.nodeBlockHeight
    : syncStatus.estimatedBlockHeight

  const datasetWithoutPrunable = useMemo<
    ContractDataWithoutPrunable[] | null
  >(() => {
    if (!response.data) {
      return null
    }
    const datums =
      response.data?.map((c) => {
        const isRenewed =
          c.renewedFrom !==
          'fcid:0000000000000000000000000000000000000000000000000000000000000000'
        const startTime = blockHeightToTime(currentHeight, c.startHeight)
        const endHeight = c.windowStart
        const endTime = blockHeightToTime(currentHeight, endHeight)
        const datum: ContractDataWithoutPrunable = {
          id: c.id,
          onClick: () => selectContract(c.id),
          state: c.state,
          hostIp: c.hostIP,
          hostKey: c.hostKey,
          contractSets: c.contractSets || [],
          inAutopilotSet: !!c.contractSets?.includes(autopilotContractSet!),
          inDefaultSet: !!c.contractSets?.includes(defaultContractSet!),
          location: geoHosts.find((h) => h.public_key === c.hostKey)?.location,
          timeline: startTime,
          startTime,
          endTime,
          contractHeightStart: c.startHeight,
          contractHeightEnd: endHeight,
          proofWindowHeightStart: c.windowStart,
          proofWindowHeightEnd: c.windowEnd,
          proofHeight: c.proofHeight,
          revisionHeight: c.revisionHeight,
          isRenewed,
          renewedFrom: c.renewedFrom,
          totalCost: new BigNumber(c.totalCost),
          spendingUploads: new BigNumber(c.spending.uploads),
          spendingDownloads: new BigNumber(c.spending.downloads),
          spendingFundAccount: new BigNumber(c.spending.fundAccount),
          size: new BigNumber(c.size),
        }
        return datum
      }) || []
    return datums
  }, [
    response.data,
    geoHosts,
    currentHeight,
    selectContract,
    autopilotContractSet,
    defaultContractSet,
  ])

  const {
    prunableSizes,
    isFetchingPrunableSizeAll,
    isFetchingPrunableSizeById,
    fetchPrunableSize,
    fetchPrunableSizeAll,
  } = usePrunableContractSizes()

  const dataset = useMemo(
    () =>
      datasetWithoutPrunable?.map((d) => {
        const datum: ContractData = {
          ...d,
          hasFetchedPrunableSize: prunableSizes[d.id]?.prunable !== undefined,
          prunableSize:
            prunableSizes[d.id]?.prunable !== undefined
              ? new BigNumber(prunableSizes[d.id]!.prunable)
              : undefined,
          isFetchingPrunableSize: !!isFetchingPrunableSizeById[d.id],
          fetchPrunableSize: () => fetchPrunableSize(d.id),
        }
        return datum
      }) || [],
    [
      datasetWithoutPrunable,
      prunableSizes,
      fetchPrunableSize,
      isFetchingPrunableSizeById,
    ],
  )

  const hasFetchedAllPrunableSize = useMemo(
    () => dataset?.every((d) => d.hasFetchedPrunableSize),
    [dataset],
  )

  return {
    dataset,
    isFetchingPrunableSizeAll,
    isFetchingPrunableSizeById,
    fetchPrunableSize,
    fetchPrunableSizeAll,
    hasFetchedAllPrunableSize,
  }
}
