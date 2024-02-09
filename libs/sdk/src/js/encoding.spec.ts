import {
  encodeHostPrices,
  decodeHostPrices,
  encodeHostSettings,
  decodeHostSettings,
} from './encoding'
import { newEncoder, newDecoder } from './encoder'
import { HostPrices, HostSettings } from '../types'

describe('encoding', () => {
  it('encodeHostPrices', () => {
    const hostPrices: HostPrices = {
      contractPrice: BigInt(1000000000),
      collateral: BigInt(2000000000),
      storagePrice: BigInt(3000000000),
      ingressPrice: BigInt(4000000000),
      egressPrice: BigInt(5000000000),
      tipHeight: 450_000,
      validUntil: '2022-12-31T00:00:00.000Z',
      signature:
        'abcd567890123456789012345678901234567890123456789012345678901234',
    }

    const e = newEncoder()
    encodeHostPrices(e, hostPrices)
    const buf = new Uint8Array(e.dataView.buffer)
    const decoded = decodeHostPrices(newDecoder(buf))
    expect(decoded).toEqual(hostPrices)
  })

  it('encodeHostSettings', () => {
    const prices: HostPrices = {
      contractPrice: BigInt(1000000000),
      collateral: BigInt(2000000000),
      storagePrice: BigInt(3000000000),
      ingressPrice: BigInt(4000000000),
      egressPrice: BigInt(5000000000),
      tipHeight: 450_000,
      validUntil: '2022-12-31T00:00:00.000Z',
      signature:
        'abcd567890123456789012345678901234567890123456789012345678901234',
    }
    const hostSettings: HostSettings = {
      version: '123',
      netAddresses: [
        { protocol: 'protocol1', address: 'address1longer' },
        { protocol: 'protocol2longer', address: 'address2' },
      ],
      // 32 bytes
      walletAddress: '12345678901234567890123456789012',
      acceptingContracts: true,
      maxCollateral: BigInt(1000000000),
      maxDuration: 100,
      remainingStorage: 100,
      totalStorage: 100,
      prices,
    }

    const e = newEncoder()
    encodeHostSettings(e, hostSettings)
    const buf = new Uint8Array(e.dataView.buffer)
    const decoded = decodeHostSettings(newDecoder(buf))
    expect(decoded).toEqual(hostSettings)
  })
})
