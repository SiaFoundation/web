import { hoursInMilliseconds } from '@siafoundation/units'

// If the last block is greater than 12 hours ago, the node is not synced.
export function getIsSynced(data?: { prevTimestamps: string[] }) {
  return data?.prevTimestamps[0]
    ? new Date(data?.prevTimestamps[0]).getTime() >
        Date.now() - hoursInMilliseconds(12)
    : false
}
