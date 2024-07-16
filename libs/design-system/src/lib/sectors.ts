import {
  GBToBytes,
  GiBToBytes,
  MiBToBytes,
  TBToBytes,
  TiBToBytes,
  bytesToGB,
  bytesToGiB,
  bytesToMiB,
  bytesToTB,
} from '@siafoundation/units'
import type BigNumber from 'bignumber.js'

// function converts sectors to bytes
export function sectorsToBytes(
  sectors: BigNumber | string | number,
): BigNumber {
  return MiBToBytes(sectors).times(4)
}

// function converts bytes to sectors
export function bytesToSectors(bytes: BigNumber | string | number): BigNumber {
  return bytesToMiB(bytes).div(4).integerValue()
}

// 1024

// function converts sectors to GiB
export function sectorsToGiB(sectors: BigNumber | string | number): BigNumber {
  return bytesToGiB(sectorsToBytes(sectors))
}

// function converts sectors to MiB
export function sectorsToMiB(sectors: BigNumber | string | number): BigNumber {
  return bytesToMiB(sectorsToBytes(sectors))
}

// function converts TiB to sectors
export function TiBToSectors(TiB: BigNumber | string | number): BigNumber {
  return bytesToSectors(TiBToBytes(TiB))
}

// function converts GiB to sectors
export function GiBToSectors(GiB: BigNumber | string | number): BigNumber {
  return bytesToSectors(GiBToBytes(GiB))
}

// function converts MiB to sectors
export function MiBToSectors(MiB: BigNumber | string | number): BigNumber {
  return bytesToSectors(MiBToBytes(MiB))
}

// 1000s

// function converts sectors to TB
export function sectorsToTB(sectors: BigNumber | string | number): BigNumber {
  return bytesToTB(sectorsToBytes(sectors))
}

// function converts TB to sectors
export function TBToSectors(TB: BigNumber | string | number): BigNumber {
  return bytesToSectors(TBToBytes(TB))
}

// function converts sectors to GB
export function sectorsToGB(sectors: BigNumber | string | number): BigNumber {
  return bytesToGB(sectorsToBytes(sectors))
}

// function converts GB to sectors
export function GBToSectors(GB: BigNumber | string | number): BigNumber {
  return bytesToSectors(GBToBytes(GB))
}
