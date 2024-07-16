import {
  type Decoder,
  type Encoder,
  decodeBytes,
  decodeLengthPrefix,
  decodeRpcId,
  decodeString,
  decodeUint8Array,
  decodeUint64,
  encodeBytes,
  encodeLengthPrefix,
  encodeRpcId,
  encodeString,
  encodeUint8Array,
  encodeUint64,
} from './encoder'
import {
  decodeHostPrices,
  decodeHostSettings,
  encodeHostPrices,
  encodeHostSettings,
} from './encoding'
import type {
  RPCReadSectorRequest,
  RPCReadSectorResponse,
  RPCSettingsRequest,
  RPCSettingsResponse,
  RPCWriteSectorRequest,
  RPCWriteSectorResponse,
} from './types'

// NOTE: This JavaScript RPC and encoding implementations is not currently used
// and may be incomplete or incorrect. It was written as a comparison to the WASM
// RPC and encoding implementations which are used and exported from the SDK.

// settings request

export function encodeRpcRequestSettings(
  e: Encoder,
  _rpcSettings: RPCSettingsRequest,
) {
  encodeRpcId(e, 'Settings')
}

export function decodeRpcRequestSettings(d: Decoder): RPCSettingsRequest {
  decodeRpcId(d)
}

// settings response

export function encodeRpcResponseSettings(e: Encoder, r: RPCSettingsResponse) {
  encodeHostSettings(e, r.settings)
}

export function decodeRpcResponseSettings(d: Decoder): RPCSettingsResponse {
  const settings = decodeHostSettings(d)
  return { settings }
}

// read sector request

export function encodeRpcRequestReadSector(
  e: Encoder,
  readSector: RPCReadSectorRequest,
) {
  encodeRpcId(e, 'ReadSector')
  encodeHostPrices(e, readSector.prices)
  encodeString(e, readSector.accountId)
  encodeBytes(e, readSector.root)
  encodeUint64(e, readSector.offset)
  encodeUint64(e, readSector.length)
}

export function decodeRpcRequestReadSector(d: Decoder): RPCReadSectorRequest {
  decodeRpcId(d)
  const prices = decodeHostPrices(d)
  const accountId = decodeString(d)
  const root = decodeBytes(d, 32)
  const offset = decodeUint64(d)
  const length = decodeUint64(d)
  return {
    prices,
    accountId,
    root,
    offset,
    length,
  }
}

// read sector response

export function encodeRpcResponseReadSector(
  e: Encoder,
  rsr: RPCReadSectorResponse,
) {
  encodeLengthPrefix(e, rsr.proof.length)
  for (let i = 0; i < rsr.proof.length; i++) {
    encodeBytes(e, rsr.proof[i])
  }
  encodeUint8Array(e, rsr.sector)
}

export function decodeRpcResponseReadSector(d: Decoder): RPCReadSectorResponse {
  const proofCount = decodeLengthPrefix(d)
  const proof = []
  for (let i = 0; i < proofCount; i++) {
    proof[i] = decodeBytes(d, 32)
  }
  const sector = decodeUint8Array(d, 1 << 22) // 4MiB
  return {
    proof,
    sector,
  }
}

// write sector request

export function encodeRpcRequestWriteSector(
  e: Encoder,
  writeSector: RPCWriteSectorRequest,
) {
  encodeRpcId(e, 'WriteSector')
  encodeHostPrices(e, writeSector.prices)
  encodeString(e, writeSector.accountId)
  encodeUint8Array(e, writeSector.sector)
}

export function decodeRpcRequestWriteSector(d: Decoder): RPCWriteSectorRequest {
  decodeRpcId(d)
  const prices = decodeHostPrices(d)
  const accountId = decodeString(d)
  const sector = decodeUint8Array(d, 1 << 22) // 4MiB
  return {
    prices,
    accountId,
    sector,
  }
}

// write sector response

export function encodeRpcResponseWriteSector(
  e: Encoder,
  wsr: RPCWriteSectorResponse,
) {
  encodeBytes(e, wsr.root)
}

export function decodeRpcResponseWriteSector(
  d: Decoder,
): RPCWriteSectorResponse {
  const root = decodeBytes(d, 32)
  return {
    root,
  }
}
