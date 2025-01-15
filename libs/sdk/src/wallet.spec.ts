/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { initSDKTest } from './initTest'
import {
  getConsensusNetwork,
  getConsensusState,
  getTransaction,
  mockPhrase,
} from './wallet.mock'

describe('wallet', () => {
  it('generateSeedPhrase', async () => {
    const sdk = await initSDKTest()
    const { phrase, error } = sdk.wallet.generateSeedPhrase()
    expect(error).toBeUndefined()
    expect(phrase?.split(' ').length).toBe(12)
  })
  it('generateKeyPair', async () => {
    const sdk = await initSDKTest()
    const { privateKey, publicKey, error } = sdk.wallet.generateKeyPair()
    expect(error).toBeUndefined()
    expect(privateKey).toBeDefined()
    expect(publicKey).toBeDefined()
  })
  it('keyPairFromSeedPhrase', async () => {
    const sdk = await initSDKTest()
    const index0 = sdk.wallet.keyPairFromSeedPhrase(
      'bundle castle coil dismiss patient patrol blind erode future pave eyebrow manual',
      0
    )
    expect(index0.error).toBeUndefined()
    expect(index0.privateKey).toBe(
      '61ca130e51261fc8657fe20616c79c69188c0d28048cb8b09010682e65bb346bec5f92330370362126df379ac6235dc3e4e2d03822922646051a341e8fcb4035'
    )
    expect(index0.publicKey).toBe(
      'ed25519:ec5f92330370362126df379ac6235dc3e4e2d03822922646051a341e8fcb4035'
    )
    const index1 = sdk.wallet.keyPairFromSeedPhrase(
      'bundle castle coil dismiss patient patrol blind erode future pave eyebrow manual',
      1
    )
    expect(index1.error).toBeUndefined()
    expect(index1.privateKey).toBe(
      '5c797a530f532c967a6097922b39d43407ec1f8cc8e04316a0458b63f1ba06e88aed9bed8227bcd8ed6b0671b13f3b5a7d7c4f0636353372ccd9b037759ce6c7'
    )
    expect(index1.publicKey).toBe(
      'ed25519:8aed9bed8227bcd8ed6b0671b13f3b5a7d7c4f0636353372ccd9b037759ce6c7'
    )
  })
  describe('standardUnlockConditions', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const { error, unlockConditions } = sdk.wallet.standardUnlockConditions(
        'ed25519:ec5f92330370362126df379ac6235dc3e4e2d03822922646051a341e8fcb4035'
      )
      expect(error).toBeUndefined()
      expect(unlockConditions).toEqual({
        publicKeys: [
          'ed25519:ec5f92330370362126df379ac6235dc3e4e2d03822922646051a341e8fcb4035',
        ],
        signaturesRequired: 1,
        timelock: 0,
      })
    })
    it('invalid', async () => {
      const sdk = await initSDKTest()
      const { error, unlockConditions } =
        sdk.wallet.standardUnlockConditions('invalid')
      expect(error).toEqual('invalid public key')
      expect(unlockConditions).toBeUndefined()
    })
  })
  describe('standardUnlockHash', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const { error, address } = sdk.wallet.standardUnlockHash(
        'ed25519:ec5f92330370362126df379ac6235dc3e4e2d03822922646051a341e8fcb4035'
      )
      expect(error).toBeUndefined()
      expect(address).toBe(
        '69e52c7d3f57df42b9736a1b5a0e67ab2e4a1cda4b0e5c0c858929a5284d843278a7ce009198'
      )
    })
    it('invalid', async () => {
      const sdk = await initSDKTest()
      const { error, address } = sdk.wallet.standardUnlockHash('invalid')
      expect(error).toEqual('invalid public key')
      expect(address).toBeUndefined()
    })
  })
  describe('addressFromUnlockConditions', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const { error, address } = sdk.wallet.addressFromUnlockConditions({
        publicKeys: [
          'ed25519:ec5f92330370362126df379ac6235dc3e4e2d03822922646051a341e8fcb4035',
        ],
        signaturesRequired: 1,
        timelock: 0,
      })
      expect(error).toBeUndefined()
      expect(address).toBe(
        '69e52c7d3f57df42b9736a1b5a0e67ab2e4a1cda4b0e5c0c858929a5284d843278a7ce009198'
      )
    })
    it('invalid', async () => {
      const sdk = await initSDKTest()
      const { error, address } = sdk.wallet.addressFromUnlockConditions({
        publicKeys: ['invalid public key'],
        signaturesRequired: 1,
        timelock: 0,
      })
      expect(error).toEqual('decoding <algorithm>:<key> failed: no separator')
      expect(address).toBeUndefined()
    })
  })
  describe('addressFromSpendPolicy', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const spendPolicy = {
        type: 'thresh',
        policy: {
          n: 1,
          of: [
            {
              type: 'above',
              policy: 100,
            },
            {
              type: 'pk',
              policy:
                'ed25519:5e4bbc181bae781575a30fabdce472842d0373c12eafcd8013dba0cbf69e34e0',
            },
          ],
        },
      }
      const { error, address } = sdk.wallet.addressFromSpendPolicy(spendPolicy)
      expect(error).toBeUndefined()
      expect(address).toEqual(
        '170bf8f730c072a881edf9be3c08d0491f23810f7344125444ebff4bd8855d98dd9159fe1cea'
      )
    })
  })
  describe('encodeTransaction', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const txn = getTransaction()
      const { error, encodedTransaction } = sdk.wallet.encodeTransaction(txn)
      expect(error).toBeUndefined()
      expect(encodedTransaction).toBeDefined()
    })
  })
  describe('transactionId', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const txn = getTransaction()
      const { error, id } = sdk.wallet.transactionId(txn)
      expect(error).toBeUndefined()
      expect(id).toEqual(
        '21cedbd4948a11132d54b278a9d0a51e23dbf03a727e01fe08875b7073ae9912'
      )
    })
  })
  describe('signTransaction', () => {
    it('signs a valid transaction', async () => {
      const sdk = await initSDKTest()
      const { privateKey } = sdk.wallet.keyPairFromSeedPhrase(mockPhrase!, 0)
      const { error, signature } = sdk.wallet.signTransactionV1(
        getConsensusState(),
        getConsensusNetwork(),
        getTransaction(),
        0,
        privateKey!
      )
      expect(error).toBeUndefined()
      expect(signature).toEqual(
        'xY+P4e5aCBR0hKU699OmTsqAOXlLbEdTQvDYknsE0xcrPtcoYcGDxz6H1xm3gvspHb/os+CxCICVqSZLyXtvBg=='
      )
    })
    it('errors if the signature index is invalid', async () => {
      const sdk = await initSDKTest()
      const { privateKey } = sdk.wallet.keyPairFromSeedPhrase(mockPhrase!, 0)
      const { error, signature } = sdk.wallet.signTransactionV1(
        getConsensusState(),
        getConsensusNetwork(),
        getTransaction(),
        1,
        privateKey!
      )
      expect(error).toEqual('signature index out of range: 1')
      expect(signature).toBeUndefined()
    })
    it('errors if the private key is invalid', async () => {
      const sdk = await initSDKTest()
      const { error, signature } = sdk.wallet.signTransactionV1(
        getConsensusState(),
        getConsensusNetwork(),
        getTransaction(),
        1,
        'invalid private key'
      )
      expect(error).toEqual(
        "error decoding private key: encoding/hex: invalid byte: U+0069 'i'"
      )
      expect(signature).toBeUndefined()
    })
  })
})
