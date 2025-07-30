import { hoursInMilliseconds } from '@siafoundation/units'

// If the last block is greater than 12 hours ago, the node is not synced.
export function getIsSynced(data?: { prevTimestamps: string[] }) {
  return data?.prevTimestamps[0]
    ? new Date(data?.prevTimestamps[0]).getTime() >
        Date.now() - hoursInMilliseconds(12)
    : false
}

export function getIsIndexing(
  consensusState?: { index: { height: number } },
  blockMetrics?: { index: { height: number } },
) {
  if (!blockMetrics || !consensusState) {
    return false
  }

  // Only show indexing warnings if the node is more than 2 blocks behind on indexing.
  const padding = 2
  return blockMetrics.index.height < consensusState.index.height - padding
}
