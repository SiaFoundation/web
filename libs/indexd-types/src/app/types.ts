import { Hash256, PublicKey } from '@siafoundation/types'

export type SectorPinParams = {
  root: Hash256
  hostKey: PublicKey
}

export type SlabPinParams = {
  encryptionKey: string[]
  minShards: number
  sectors: SectorPinParams[]
}

export type PinnedSector = {
  root: Hash256
  hostKey: PublicKey
}

export type PinnedSlab = {
  id: string
  encryptionKey: string[]
  minShards: number
  sectors: PinnedSector[]
}
