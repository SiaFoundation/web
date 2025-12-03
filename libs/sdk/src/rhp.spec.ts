/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  HostPrices,
  HostSettings,
  RPCReadSectorRequest,
  RPCReadSectorResponse,
  RPCSettingsResponse,
  RPCWriteSectorRequest,
  RPCWriteSectorResponse,
} from './types'
import { initSDKTest } from './initTest'
import { Result } from '@siafoundation/types'

describe('rhp', () => {
  describe('generateAccount', () => {
    it('works', async () => {
      const sdk = await initSDKTest()
      const { privateKey, account } = expectResult(sdk.rhp.generateAccount())
      expect(privateKey).toBeDefined()
      expect(privateKey?.length).toBeGreaterThan(40)
      expect(account).toBeDefined()
      expect(account?.length).toBeGreaterThan(40)
    })
  })
  describe('settings', () => {
    describe('request', () => {
      it('valid', async () => {
        const sdk = await initSDKTest()
        const { rpc } = expectResult(sdk.rhp.encodeSettingsRequest())
        expect(rpc).toBeDefined()
        const { data } = expectResult(sdk.rhp.decodeSettingsRequest(rpc!))
        expect(data).toEqual({})
      })
    })
    describe('response', () => {
      it('valid', async () => {
        const sdk = await initSDKTest()
        const json = getSampleRPCSettingsResponse()
        const { rpc } = expectResult(sdk.rhp.encodeSettingsResponse(json))
        expect(rpc).toBeDefined()
        expect(rpc?.length).toEqual(264)
        const { data } = expectResult(sdk.rhp.decodeSettingsResponse(rpc!))
        expect(data).toEqual(json)
      })
      it('encode error', async () => {
        const sdk = await initSDKTest()
        const json = {
          settings: {
            walletAddress: 'invalid',
          },
        } as RPCSettingsResponse
        expectError(
          sdk.rhp.encodeSettingsResponse(json),
          'address must be 76 characters',
        )
      })
      it('decode error', async () => {
        const sdk = await initSDKTest()
        const json = getSampleRPCSettingsResponse()
        const { rpc } = expectResult(sdk.rhp.encodeSettingsResponse(json))
        // manipulate the valid rpc to make it invalid
        rpc!.set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0)
        expectError(
          sdk.rhp.decodeSettingsResponse(rpc!),
          'encoded object contains invalid length prefix (723118041428460547 elems > 11254 bytes left in stream)',
        )
      })
    })
  })
  describe('read', () => {
    describe('request', () => {
      it('valid', async () => {
        const sdk = await initSDKTest()
        const json: RPCReadSectorRequest = {
          token: {
            hostKey:
              'ed25519:1b6793e900df020dc9a43c6df5f5d10dc5793956d44831ca5bbfec659021b75e',
            account:
              'ed25519:1b6793e900df020dc9a43c6df5f5d10dc5793956d44831ca5bbfec659021b75e',
            validUntil: '2022-12-31T00:00:00Z',
            signature:
              '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072cfddf242a1ef033dd7d669c711e846c59cb916f804a03d72d279ffef7e6583404',
          },
          root: '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072c',
          prices: getSampleHostPrices(),
          offset: 0,
          length: 4,
        }
        const { rpc } = expectResult(sdk.rhp.encodeReadSectorRequest(json))
        expect(rpc.length).toEqual(376)
        const { data } = expectResult(sdk.rhp.decodeReadSectorRequest(rpc!))
        expect(data).toEqual(json)
      })
      it('encode error', async () => {
        const sdk = await initSDKTest()
        const json: RPCReadSectorRequest = {
          token: {
            hostKey:
              'ed25519:1b6793e900df020dc9a43c6df5f5d10dc5793956d44831ca5bbfec659021b75e',
            account: 'invalid',
            validUntil: '2022-12-31T00:00:00Z',
            signature:
              '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072cfddf242a1ef033dd7d669c711e846c59cb916f804a03d72d279ffef7e6583404',
          },
          root: '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072c',
          prices: getSampleHostPrices(),
          offset: 0,
          length: 4,
        }
        expectError(
          sdk.rhp.encodeReadSectorRequest(json),
          "decoding ed25519:<hex> failed: encoding/hex: invalid byte: U+0069 'i'",
        )
      })
    })
    describe('response', () => {
      it('valid', async () => {
        const sdk = await initSDKTest()
        const json: RPCReadSectorResponse = {
          proof: [
            '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072c',
          ],
          dataLength: 4,
        }
        const { rpc } = expectResult(sdk.rhp.encodeReadSectorResponse(json))
        expect(rpc.toString()).toEqual(
          [
            0, 1, 0, 0, 0, 0, 0, 0, 0, 69, 114, 86, 214, 161, 96, 59, 239, 127,
            169, 87, 167, 11, 91, 169, 106, 157, 239, 47, 234, 139, 76, 20, 131,
            6, 13, 123, 165, 207, 138, 7, 44, 4, 0, 0, 0, 0, 0, 0, 0,
          ].toString(),
        )
        const { data } = expectResult(sdk.rhp.decodeReadSectorResponse(rpc!))
        expect(data).toEqual(json)
      })
      it('encode error', async () => {
        const sdk = await initSDKTest()
        const json: RPCReadSectorResponse = {
          proof: ['invalid'],
          dataLength: 4,
        }
        expectError(
          sdk.rhp.encodeReadSectorResponse(json),
          'decoding "invalid" failed: encoding/hex: invalid byte: U+0069 \'i\'',
        )
      })
    })
  })
  describe('write', () => {
    describe('request', () => {
      it('valid', async () => {
        const sdk = await initSDKTest()
        const json: RPCWriteSectorRequest = {
          token: {
            hostKey:
              'ed25519:1b6793e900df020dc9a43c6df5f5d10dc5793956d44831ca5bbfec659021b75e',
            account:
              'ed25519:1b6793e900df020dc9a43c6df5f5d10dc5793956d44831ca5bbfec659021b75e',
            validUntil: '2022-12-31T00:00:00Z',
            signature:
              '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072cfddf242a1ef033dd7d669c711e846c59cb916f804a03d72d279ffef7e6583404',
          },
          dataLength: 4,
          prices: getSampleHostPrices(),
        }
        const { rpc } = expectResult(sdk.rhp.encodeWriteSectorRequest(json))
        expect(rpc.length).toEqual(336)
        const { data } = expectResult(sdk.rhp.decodeWriteSectorRequest(rpc!))
        expect(data).toEqual(json)
      })
      it('encode error', async () => {
        const sdk = await initSDKTest()
        const json = {
          token: {
            hostKey:
              'ed25519:3926a0434232bba9eaca2041303a1039d4f65bf54d7bd4e2a9164ea2d778b714',
            account: 'invalid',
            validUntil: '2022-12-31T00:00:00Z',
            signature:
              'sig:457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072cfddf242a1ef033dd7d669c711e846c59cb916f804a03d72d279ffef7e6583404',
          },
          dataLength: 4,
          prices: getSampleHostPrices(),
        } as RPCWriteSectorRequest
        expectError(
          sdk.rhp.encodeWriteSectorRequest(json),
          "decoding ed25519:<hex> failed: encoding/hex: invalid byte: U+0069 'i'",
        )
      })
    })
    describe('response', () => {
      it('valid', async () => {
        const sdk = await initSDKTest()
        const json: RPCWriteSectorResponse = {
          root: '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072c',
        }
        const { rpc } = expectResult(sdk.rhp.encodeWriteSectorResponse(json))
        expect(rpc.toString()).toEqual(
          [
            0, 69, 114, 86, 214, 161, 96, 59, 239, 127, 169, 87, 167, 11, 91,
            169, 106, 157, 239, 47, 234, 139, 76, 20, 131, 6, 13, 123, 165, 207,
            138, 7, 44,
          ].toString(),
        )
        const { data } = expectResult(sdk.rhp.decodeWriteSectorResponse(rpc!))
        expect(data).toEqual(json)
      })
      it('encode error', async () => {
        const sdk = await initSDKTest()
        const json = {
          root: 'invalid',
        } as RPCWriteSectorResponse
        expectError(
          sdk.rhp.encodeWriteSectorResponse(json),
          'decoding "invalid" failed: encoding/hex: invalid byte: U+0069 \'i\'',
        )
      })
    })
  })
})

function getSampleHostPrices(): HostPrices {
  return {
    contractPrice: '1',
    collateral: '2',
    storagePrice: '3',
    ingressPrice: '4',
    egressPrice: '5',
    freeSectorPrice: '6',
    tipHeight: 150_000,
    validUntil: '2022-12-31T00:00:00Z',
    signature:
      '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072cfddf242a1ef033dd7d669c711e846c59cb916f804a03d72d279ffef7e6583404',
  }
}

function getSampleRPCSettingsResponse(): RPCSettingsResponse {
  const prices = getSampleHostPrices()
  const settings: HostSettings = {
    protocolVersion: 'v1.2.3',
    release: 'xxx',
    // 32 bytes
    walletAddress:
      'eec8160897cf7058332040675d120c008dc32d96925e9b32a812b646e31676d7d52c118cad2c',
    acceptingContracts: true,
    maxCollateral: '1000000000',
    maxContractDuration: 100,
    remainingStorage: 100,
    totalStorage: 100,
    prices,
  }
  return {
    settings,
  }
}

function expectResult<T extends object>(result: Result<T>) {
  if ('error' in result) {
    throw new Error(result.error)
  }
  return result
}

function expectError(result: Result<object>, error: string) {
  if ('error' in result) {
    expect(result.error).toEqual(error)
  } else {
    throw new Error('expected error')
  }
}
