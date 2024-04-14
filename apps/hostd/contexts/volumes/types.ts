import { VolumeStatus } from '@siafoundation/hostd-types'
import BigNumber from 'bignumber.js'

export type VolumeData = {
  id: string
  localPath: string
  usedSectors: number
  totalSectors: number
  usedBytes: number
  totalBytes: number
  readOnly: boolean
  available: boolean
  status: VolumeStatus
  failedReads: BigNumber
  failedWrites: BigNumber
  successfulReads: BigNumber
  successfulWrites: BigNumber
  errors: string[]
}

export type TableColumnId =
  | 'actions'
  | 'path'
  | 'storage'
  | 'available'
  | 'readOnly'
  | 'successfulReads'
  | 'successfulWrites'
  | 'failedReads'
  | 'failedWrites'

export const columnsDefaultVisible: TableColumnId[] = [
  'actions',
  'path',
  'storage',
  'available',
  'readOnly',
  'successfulReads',
  'successfulWrites',
  'failedReads',
  'failedWrites',
]
