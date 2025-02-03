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

describe('rhp', () => {
  describe('generateAccount', () => {
    it('works', async () => {
      const sdk = await initSDKTest()
      const response = sdk.rhp.generateAccount()
      if ('error' in response) {
        throw new Error(response.error)
      }
      const { privateKey, account } = response
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
        const encode = sdk.rhp.encodeSettingsRequest()
        if ('error' in encode) {
          throw new Error(encode.error)
        }
        const { rpc } = encode
        expect(rpc).toBeDefined()
        const decode = sdk.rhp.decodeSettingsRequest(rpc!)
        if ('error' in decode) {
          throw new Error(decode.error)
        }
        expect(decode.data).toEqual({})
      })
    })
    describe('response', () => {
      it('valid', async () => {
        const sdk = await initSDKTest()
        const json = getSampleRPCSettingsResponse()
        const encode = sdk.rhp.encodeSettingsResponse(json)
        if ('error' in encode) {
          throw new Error(encode.error)
        }
        const { rpc } = encode
        expect(rpc).toBeDefined()
        expect(rpc?.length).toEqual(264)
        const decode = sdk.rhp.decodeSettingsResponse(rpc!)
        if ('error' in decode) {
          throw new Error(decode.error)
        }
        expect(decode.data).toEqual(json)
      })
      it('encode error', async () => {
        const sdk = await initSDKTest()
        const json = {
          settings: {
            walletAddress: 'invalid',
          },
        } as RPCSettingsResponse
        const encode = sdk.rhp.encodeSettingsResponse(json)
        if ('error' in encode) {
          expect(encode.error).toEqual('address must be 76 characters')
        } else {
          throw new Error('expected error')
        }
      })
      it('decode error', async () => {
        const sdk = await initSDKTest()
        const json = getSampleRPCSettingsResponse()
        const encode = sdk.rhp.encodeSettingsResponse(json)
        if ('error' in encode) {
          throw new Error(encode.error)
        }
        // manipulate the valid rpc to make it invalid
        encode.rpc!.set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0)
        const decode = sdk.rhp.decodeSettingsResponse(encode.rpc!)
        if ('error' in decode) {
          expect(decode.error).toEqual(
            'encoded object contains invalid length prefix (723118041428460547 elems > 11254 bytes left in stream)'
          )
        } else {
          throw new Error('expected error')
        }
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
              '1b6793e900df020dc9a43c6df5f5d10dc5793956d44831ca5bbfec659021b75e',
            validUntil: '2022-12-31T00:00:00Z',
            signature:
              '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072cfddf242a1ef033dd7d669c711e846c59cb916f804a03d72d279ffef7e6583404',
          },
          root: '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072c',
          prices: getSampleHostPrices(),
          offset: 0,
          length: 4,
        }
        const encode = sdk.rhp.encodeReadSectorRequest(json)
        if ('error' in encode) {
          throw new Error(encode.error)
        }
        const { rpc } = encode
        expect(rpc?.length).toEqual(376)
        const decode = sdk.rhp.decodeReadSectorRequest(rpc!)
        if ('error' in decode) {
          throw new Error(decode.error)
        }
        expect(decode.data).toEqual(json)
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
        const encode = sdk.rhp.encodeReadSectorRequest(json)
        if ('error' in encode) {
          expect(encode.error).toEqual(
            "decoding acct:<hex> failed: encoding/hex: invalid byte: U+0069 'i'"
          )
        } else {
          throw new Error('expected error')
        }
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
        const encode = sdk.rhp.encodeReadSectorResponse(json)
        if ('error' in encode) {
          throw new Error(encode.error)
        }
        const { rpc } = encode
        expect(rpc?.toString()).toEqual(
          [
            0, 1, 0, 0, 0, 0, 0, 0, 0, 69, 114, 86, 214, 161, 96, 59, 239, 127,
            169, 87, 167, 11, 91, 169, 106, 157, 239, 47, 234, 139, 76, 20, 131,
            6, 13, 123, 165, 207, 138, 7, 44, 4, 0, 0, 0, 0, 0, 0, 0,
          ].toString()
        )
        const decode = sdk.rhp.decodeReadSectorResponse(rpc!)
        if ('error' in decode) {
          throw new Error(decode.error)
        }
        expect(decode.data).toEqual(json)
      })
      it('encode error', async () => {
        const sdk = await initSDKTest()
        const json: RPCReadSectorResponse = {
          proof: ['invalid'],
          dataLength: 4,
        }
        const encode = sdk.rhp.encodeReadSectorResponse(json)
        if ('error' in encode) {
          expect(encode.error).toEqual(
            'decoding "invalid" failed: encoding/hex: invalid byte: U+0069 \'i\''
          )
        } else {
          throw new Error('expected error')
        }
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
              '1b6793e900df020dc9a43c6df5f5d10dc5793956d44831ca5bbfec659021b75e',
            validUntil: '2022-12-31T00:00:00Z',
            signature:
              '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072cfddf242a1ef033dd7d669c711e846c59cb916f804a03d72d279ffef7e6583404',
          },
          dataLength: 4,
          prices: getSampleHostPrices(),
        }
        const encode = sdk.rhp.encodeWriteSectorRequest(json)
        if ('error' in encode) {
          throw new Error(encode.error)
        }
        const { rpc } = encode
        expect(rpc?.length).toEqual(336)
        const decode = sdk.rhp.decodeWriteSectorRequest(rpc!)
        if ('error' in decode) {
          throw new Error(decode.error)
        }
        expect(decode.data).toEqual(json)
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
        const encode = sdk.rhp.encodeWriteSectorRequest(json)
        if ('error' in encode) {
          expect(encode.error).toEqual(
            "decoding acct:<hex> failed: encoding/hex: invalid byte: U+0069 'i'"
          )
        } else {
          throw new Error('expected error')
        }
      })
    })
    describe('response', () => {
      it('valid', async () => {
        const sdk = await initSDKTest()
        const json: RPCWriteSectorResponse = {
          root: '457256d6a1603bef7fa957a70b5ba96a9def2fea8b4c1483060d7ba5cf8a072c',
        }
        const encode = sdk.rhp.encodeWriteSectorResponse(json)
        if ('error' in encode) {
          throw new Error(encode.error)
        }
        const { rpc } = encode
        expect(rpc?.toString()).toEqual(
          [
            0, 69, 114, 86, 214, 161, 96, 59, 239, 127, 169, 87, 167, 11, 91,
            169, 106, 157, 239, 47, 234, 139, 76, 20, 131, 6, 13, 123, 165, 207,
            138, 7, 44,
          ].toString()
        )
        const decode = sdk.rhp.decodeWriteSectorResponse(rpc!)
        if ('error' in decode) {
          throw new Error(decode.error)
        }
        expect(decode.data).toEqual(json)
      })
      it('encode error', async () => {
        const sdk = await initSDKTest()
        const json = {
          root: 'invalid',
        } as RPCWriteSectorResponse
        const encode = sdk.rhp.encodeWriteSectorResponse(json)
        if ('error' in encode) {
          expect(encode.error).toEqual(
            'decoding "invalid" failed: encoding/hex: invalid byte: U+0069 \'i\''
          )
        } else {
          throw new Error('expected error')
        }
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
    protocolVersion: [1, 2, 3],
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
