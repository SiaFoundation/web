import { useContracts as useContractsData } from '@siafoundation/renterd-react'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { ContractData, ContractDataWithoutPrunable } from './types'
import { useSiaCentralHosts } from '@siafoundation/sia-central-react'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { blockHeightToTime } from '@siafoundation/units'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { usePrunableContractSizes } from './usePrunableContractSizes'
import { Maybe } from '@siafoundation/types'

export function useDataset() {
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
    Maybe<ContractDataWithoutPrunable[]>
  >(() => {
    if (!response.data) {
      return undefined
    }
    const datums =
      response.data?.map((c) => {
        const isRenewed =
          c.renewedFrom !==
          '0000000000000000000000000000000000000000000000000000000000000000'
        const startTime = blockHeightToTime(currentHeight, c.startHeight)
        const endHeight = c.windowStart
        const endTime = blockHeightToTime(currentHeight, endHeight)
        const datum: ContractDataWithoutPrunable = {
          id: c.id,
          state: c.state,
          hostKey: c.hostKey,
          location: geoHosts.find((h) => h.public_key === c.hostKey)?.location,
          timeline: startTime,
          usability: c.usability,
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
          initialRenterFunds: new BigNumber(c.initialRenterFunds),
          spendingUploads: new BigNumber(c.spending.uploads),
          spendingDeletions: new BigNumber(c.spending.deletions),
          spendingSectorRoots: new BigNumber(c.spending.sectorRoots),
          spendingFundAccount: new BigNumber(c.spending.fundAccount),
          size: new BigNumber(c.size),
          // selectable
          onClick: () => null,
          isSelected: false,
        }
        return datum
      }) || []
    return datums
  }, [response.data, geoHosts, currentHeight])

  const {
    prunableSizes,
    isFetchingPrunableSizeAll,
    isFetchingPrunableSizeById,
    fetchPrunableSize,
    fetchPrunableSizeAll,
  } = usePrunableContractSizes()

  const dataset = useMemo<Maybe<ContractData[]>>(
    () =>
      datasetWithoutPrunable?.map((d) => {
        const datum: ContractData = {
          ...d,
          hasFetchedPrunableSize: prunableSizes[d.id]?.prunable !== undefined,
          prunableSize:
            prunableSizes[d.id]?.prunable !== undefined
              ? new BigNumber(prunableSizes[d.id].prunable)
              : undefined,
          isFetchingPrunableSize: isFetchingPrunableSizeById[d.id],
          fetchPrunableSize: () => fetchPrunableSize(d.id),
        }
        return datum
      }) || [],
    [
      datasetWithoutPrunable,
      prunableSizes,
      fetchPrunableSize,
      isFetchingPrunableSizeById,
    ]
  )

  const hasFetchedAllPrunableSize = useMemo(
    () => !!dataset?.every((d) => d.hasFetchedPrunableSize),
    [dataset]
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
