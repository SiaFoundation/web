import {
  type Decoder,
  type Encoder,
  decodeAddress,
  decodeBoolean,
  decodeCurrency,
  decodeLengthPrefix,
  decodeSignature,
  decodeString,
  decodeTime,
  decodeUint8Array,
  decodeUint64,
  encodeAddress,
  encodeBoolean,
  encodeCurrency,
  encodeLengthPrefix,
  encodeSignature,
  encodeString,
  encodeTime,
  encodeUint8Array,
  encodeUint64,
} from './encoder'
import type { HostPrices, HostSettings, NetAddress } from './types'

export function encodeHostPrices(e: Encoder, hostPrices: HostPrices) {
  encodeCurrency(e, hostPrices.contractPrice)
  encodeCurrency(e, hostPrices.collateral)
  encodeCurrency(e, hostPrices.storagePrice)
  encodeCurrency(e, hostPrices.ingressPrice)
  encodeCurrency(e, hostPrices.egressPrice)
  encodeUint64(e, hostPrices.tipHeight)
  encodeTime(e, hostPrices.validUntil)
  encodeSignature(e, hostPrices.signature)
}

export function decodeHostPrices(d: Decoder): HostPrices {
  const contractPrice = decodeCurrency(d)
  const collateral = decodeCurrency(d)
  const storagePrice = decodeCurrency(d)
  const ingressPrice = decodeCurrency(d)
  const egressPrice = decodeCurrency(d)
  const tipHeight = decodeUint64(d)
  const validUntil = decodeTime(d)
  const signature = decodeSignature(d)
  return {
    contractPrice,
    collateral,
    storagePrice,
    ingressPrice,
    egressPrice,
    tipHeight,
    validUntil,
    signature,
  }
}

export function encodeNetAddress(e: Encoder, n: NetAddress) {
  encodeString(e, n.protocol)
  encodeString(e, n.address)
}

export function decodeNetAddress(d: Decoder): NetAddress {
  const protocol = decodeString(d)
  const address = decodeString(d)
  return {
    protocol,
    address,
  }
}

export function encodeHostSettings(e: Encoder, hostSettings: HostSettings) {
  encodeUint8Array(e, hostSettings.version)
  encodeLengthPrefix(e, hostSettings.netAddresses.length)
  for (let i = 0; i < hostSettings.netAddresses.length; i++) {
    encodeNetAddress(e, hostSettings.netAddresses[i])
  }
  encodeAddress(e, hostSettings.walletAddress)
  encodeBoolean(e, hostSettings.acceptingContracts)
  encodeCurrency(e, hostSettings.maxCollateral)
  encodeUint64(e, hostSettings.maxDuration)
  encodeUint64(e, hostSettings.remainingStorage)
  encodeUint64(e, hostSettings.totalStorage)
  encodeHostPrices(e, hostSettings.prices)
}

export function decodeHostSettings(d: Decoder): HostSettings {
  const version = decodeUint8Array(d, 3)
  const netAddresses = []
  const length = decodeLengthPrefix(d)
  for (let i = 0; i < length; i++) {
    netAddresses[i] = decodeNetAddress(d)
  }
  const walletAddress = decodeAddress(d)
  const acceptingContracts = decodeBoolean(d)
  const maxCollateral = decodeCurrency(d)
  const maxDuration = decodeUint64(d)
  const remainingStorage = decodeUint64(d)
  const totalStorage = decodeUint64(d)
  const prices = decodeHostPrices(d)
  return {
    version,
    netAddresses,
    walletAddress,
    acceptingContracts,
    maxCollateral,
    maxDuration,
    remainingStorage,
    totalStorage,
    prices,
  }
}
