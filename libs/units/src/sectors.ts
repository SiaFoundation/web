import BigNumber from 'bignumber.js'
import {
  bytesToGB,
  bytesToGiB,
  bytesToMiB,
  bytesToTB,
  GBToBytes,
  GiBToBytes,
  MiBToBytes,
  TBToBytes,
  TiBToBytes,
} from './bytes'

// Converts sectors to bytes.
export function sectorsToBytes(
  sectors: BigNumber | string | number,
): BigNumber {
  return MiBToBytes(sectors).times(4)
}

// Converts bytes to sectors.
export function bytesToSectors(bytes: BigNumber | string | number): BigNumber {
  return bytesToMiB(bytes).div(4).integerValue()
}

// 1024

// Converts sectors to GiB.
export function sectorsToGiB(sectors: BigNumber | string | number): BigNumber {
  return bytesToGiB(sectorsToBytes(sectors))
}

// Converts sectors to MiB.
export function sectorsToMiB(sectors: BigNumber | string | number): BigNumber {
  return bytesToMiB(sectorsToBytes(sectors))
}

// Converts TiB to sectors.
export function TiBToSectors(TiB: BigNumber | string | number): BigNumber {
  return bytesToSectors(TiBToBytes(TiB))
}

// Converts GiB to sectors.
export function GiBToSectors(GiB: BigNumber | string | number): BigNumber {
  return bytesToSectors(GiBToBytes(GiB))
}

// Converts MiB to sectors.
export function MiBToSectors(MiB: BigNumber | string | number): BigNumber {
  return bytesToSectors(MiBToBytes(MiB))
}

// 1000

// Converts sectors to TB.
export function sectorsToTB(sectors: BigNumber | string | number): BigNumber {
  return bytesToTB(sectorsToBytes(sectors))
}

// Converts TB to sectors.
export function TBToSectors(TB: BigNumber | string | number): BigNumber {
  return bytesToSectors(TBToBytes(TB))
}

// Converts sectors to GB.
export function sectorsToGB(sectors: BigNumber | string | number): BigNumber {
  return bytesToGB(sectorsToBytes(sectors))
}

// Converts GB to sectors.
export function GBToSectors(GB: BigNumber | string | number): BigNumber {
  return bytesToSectors(GBToBytes(GB))
}
