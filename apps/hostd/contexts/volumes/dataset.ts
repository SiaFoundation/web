import { useMemo } from 'react'
import { useVolumes, VolumeMeta } from '@siafoundation/react-hostd'
import { VolumeData } from './types'
import BigNumber from 'bignumber.js'
import { MiBToBytes } from '@siafoundation/units'

export function useDataset({
  response,
}: {
  response: ReturnType<typeof useVolumes>
}) {
  return useMemo<VolumeData[] | null>(() => {
    if (!response.data) {
      return null
    }
    return (
      response.data?.map((contract) => {
        return getFields(contract)
      }) || []
    )
  }, [response.data])
}

function getFields(c: VolumeMeta): VolumeData {
  return {
    id: String(c.id),
    localPath: c.localPath,
    usedSectors: c.usedSectors,
    usedBytes: new BigNumber(c.usedSectors).times(MiBToBytes(4)).toNumber(),
    totalBytes: new BigNumber(c.totalSectors).times(MiBToBytes(4)).toNumber(),
    totalSectors: c.totalSectors,
    status: c.status,
    readOnly: c.readOnly,
    available: c.available,
    failedReads: new BigNumber(c.failedReads),
    failedWrites: new BigNumber(c.failedWrites),
    successfulReads: new BigNumber(c.successfulReads),
    successfulWrites: new BigNumber(c.successfulWrites),
    errors: c.errors,
  }
}
