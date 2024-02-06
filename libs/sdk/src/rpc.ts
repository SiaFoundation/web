import {
  encodeBytes,
  encodeString,
  encodeUint64,
  encodeLengthPrefix,
  decodeBytes,
  decodeString,
  decodeUint64,
  decodeLengthPrefix,
  Encoder,
  Decoder,
  encodeUint8Array,
  decodeUint8Array,
  encodeRpcId,
  decodeRpcId,
} from './encoder'
import {
  decodeHostPrices,
  decodeHostSettings,
  encodeHostPrices,
  encodeHostSettings,
} from './encoding'
import {
  RPCReadSectorRequest,
  RPCReadSectorResponse,
  RPCSettingsRequest,
  RPCSettingsResponse,
  RPCWriteSectorRequest,
  RPCWriteSectorResponse,
} from './types'

// settings request

export function encodeRpcRequestSettings(
  e: Encoder,
  _rpcSettings: RPCSettingsRequest
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
  readSector: RPCReadSectorRequest
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
  rsr: RPCReadSectorResponse
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
  writeSector: RPCWriteSectorRequest
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
  wsr: RPCWriteSectorResponse
) {
  encodeBytes(e, wsr.root)
}

export function decodeRpcResponseWriteSector(
  d: Decoder
): RPCWriteSectorResponse {
  const root = decodeBytes(d, 32)
  return {
    root,
  }
}
