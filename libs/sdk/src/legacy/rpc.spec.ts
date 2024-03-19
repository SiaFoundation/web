import crypto from 'crypto'
import { newEncoder, newDecoder } from './encoder'
import {
  HostPrices,
  HostSettings,
  RPCReadSectorRequest,
  RPCReadSectorResponse,
  RPCSettingsRequest,
  RPCSettingsResponse,
  RPCWriteSectorRequest,
  RPCWriteSectorResponse,
} from './types'
import {
  decodeRpcRequestReadSector,
  decodeRpcRequestSettings,
  decodeRpcRequestWriteSector,
  decodeRpcResponseReadSector,
  decodeRpcResponseSettings,
  decodeRpcResponseWriteSector,
  encodeRpcRequestReadSector,
  encodeRpcRequestSettings,
  encodeRpcRequestWriteSector,
  encodeRpcResponseReadSector,
  encodeRpcResponseSettings,
  encodeRpcResponseWriteSector,
} from './rpc'

const prices: HostPrices = {
  contractPrice: '1000000000',
  collateral: '2000000000',
  storagePrice: '3000000000',
  ingressPrice: '4000000000',
  egressPrice: '5000000000',
  tipHeight: 450_000,
  validUntil: '2022-12-31T00:00:00.000Z',
  signature: 'abcd567890123456789012345678901234567890123456789012345678901234',
}

const hostSettings: HostSettings = {
  version: new Uint8Array([1, 2, 3]),
  netAddresses: [
    { protocol: 'protocol1', address: 'address1longer' },
    { protocol: 'protocol2longer', address: 'address2' },
  ],
  // 32 bytes
  walletAddress: '12345678901234567890123456789012',
  acceptingContracts: true,
  maxCollateral: '1000000000',
  maxDuration: 100,
  remainingStorage: 100,
  totalStorage: 100,
  prices,
}

describe('rpc', () => {
  describe('settings', () => {
    it('request', () => {
      const e = newEncoder()
      const rpc: RPCSettingsRequest = undefined
      encodeRpcRequestSettings(e, rpc)
      const buf = new Uint8Array(e.dataView.buffer)
      const decoded = decodeRpcRequestSettings(newDecoder(buf))
      expect(decoded).toEqual(rpc)
    })

    it('response', () => {
      const e = newEncoder()
      const rpc: RPCSettingsResponse = {
        settings: hostSettings,
      }
      encodeRpcResponseSettings(e, rpc)
      const buf = new Uint8Array(e.dataView.buffer)
      const decoded = decodeRpcResponseSettings(newDecoder(buf))
      expect(decoded).toEqual(rpc)
    })
  })
  describe('read sector', () => {
    it('request', () => {
      const e = newEncoder()
      const rpc: RPCReadSectorRequest = {
        prices,
        accountId: 'accountId',
        root: '1'.repeat(32),
        offset: 44,
        length: 32,
      }
      encodeRpcRequestReadSector(e, rpc)
      const buf = new Uint8Array(e.dataView.buffer)
      const decoded = decodeRpcRequestReadSector(newDecoder(buf))
      expect(decoded).toEqual(rpc)
    })

    it('response', () => {
      const e = newEncoder()
      const rpc: RPCReadSectorResponse = {
        proof: ['1'.repeat(32), '2'.repeat(32)],
        sector: new Uint8Array(1 << 22), // 4MiB
      }
      encodeRpcResponseReadSector(e, rpc)
      const buf = new Uint8Array(e.dataView.buffer)
      const decoded = decodeRpcResponseReadSector(newDecoder(buf))
      expect(decoded.proof).toEqual(rpc.proof)
      // Compare binary parts by hashes
      const originalHash = hashBuffer(rpc.sector)
      const decodedHash = hashBuffer(decoded.sector)
      expect(decodedHash).toEqual(originalHash)
    })
  })

  describe('write sector', () => {
    it('request', () => {
      const e = newEncoder()
      const rpc: RPCWriteSectorRequest = {
        prices,
        accountId: 'accountId',
        sector: new Uint8Array(1 << 22), // 4MiB
      }
      encodeRpcRequestWriteSector(e, rpc)
      const buf = new Uint8Array(e.dataView.buffer)
      const decoded = decodeRpcRequestWriteSector(newDecoder(buf))
      expect(decoded.accountId).toEqual(rpc.accountId)
      expect(decoded.prices).toEqual(rpc.prices)
      // Compare binary parts by hashes
      const originalHash = hashBuffer(rpc.sector)
      const decodedHash = hashBuffer(decoded.sector)
      expect(decodedHash).toEqual(originalHash)
    })

    it('response', () => {
      const e = newEncoder()
      const rpc: RPCWriteSectorResponse = {
        root: '1'.repeat(32),
      }
      encodeRpcResponseWriteSector(e, rpc)
      const buf = new Uint8Array(e.dataView.buffer)
      const decoded = decodeRpcResponseWriteSector(newDecoder(buf))
      expect(decoded).toEqual(rpc)
    })
  })
})

function hashBuffer(buffer: Uint8Array) {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}
