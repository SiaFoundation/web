import { Result } from '@siafoundation/types'
import { initSDKTest } from './initTest'
import {
  getConsensusNetwork,
  getConsensusState,
  getTransaction,
  getV2Transaction,
  mockPhrase,
} from './wallet.mock'

describe('wallet', () => {
  it('generateSeedPhrase', async () => {
    const sdk = await initSDKTest()
    const { phrase } = expectResult(sdk.wallet.generateSeedPhrase())
    expect(phrase.split(' ').length).toBe(12)
  })
  it('generateKeyPair', async () => {
    const sdk = await initSDKTest()
    const { privateKey, publicKey } = expectResult(sdk.wallet.generateKeyPair())
    expect(privateKey).toBeDefined()
    expect(publicKey).toBeDefined()
  })
  it('keyPairFromSeedPhrase', async () => {
    const sdk = await initSDKTest()
    const { privateKey, publicKey } = expectResult(
      sdk.wallet.keyPairFromSeedPhrase(
        'bundle castle coil dismiss patient patrol blind erode future pave eyebrow manual',
        0,
      ),
    )
    expect(privateKey).toBe(
      '61ca130e51261fc8657fe20616c79c69188c0d28048cb8b09010682e65bb346bec5f92330370362126df379ac6235dc3e4e2d03822922646051a341e8fcb4035',
    )
    expect(publicKey).toBe(
      'ed25519:ec5f92330370362126df379ac6235dc3e4e2d03822922646051a341e8fcb4035',
    )
    const { privateKey: privateKey1, publicKey: publicKey1 } = expectResult(
      sdk.wallet.keyPairFromSeedPhrase(
        'bundle castle coil dismiss patient patrol blind erode future pave eyebrow manual',
        1,
      ),
    )
    expect(privateKey1).toBe(
      '5c797a530f532c967a6097922b39d43407ec1f8cc8e04316a0458b63f1ba06e88aed9bed8227bcd8ed6b0671b13f3b5a7d7c4f0636353372ccd9b037759ce6c7',
    )
    expect(publicKey1).toBe(
      'ed25519:8aed9bed8227bcd8ed6b0671b13f3b5a7d7c4f0636353372ccd9b037759ce6c7',
    )
  })
  describe('standardUnlockConditions', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const { unlockConditions } = expectResult(
        sdk.wallet.standardUnlockConditions(
          'ed25519:ec5f92330370362126df379ac6235dc3e4e2d03822922646051a341e8fcb4035',
        ),
      )
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
      expectError(
        sdk.wallet.standardUnlockConditions('invalid'),
        'invalid public key',
      )
    })
  })
  describe('standardUnlockHash', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const { address } = expectResult(
        sdk.wallet.standardUnlockHash(
          'ed25519:ec5f92330370362126df379ac6235dc3e4e2d03822922646051a341e8fcb4035',
        ),
      )
      expect(address).toBe(
        '69e52c7d3f57df42b9736a1b5a0e67ab2e4a1cda4b0e5c0c858929a5284d843278a7ce009198',
      )
    })
    it('invalid', async () => {
      const sdk = await initSDKTest()
      expectError(
        sdk.wallet.standardUnlockHash('invalid'),
        'invalid public key',
      )
    })
  })
  describe('addressFromUnlockConditions', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const { address } = expectResult(
        sdk.wallet.addressFromUnlockConditions({
          publicKeys: [
            'ed25519:ec5f92330370362126df379ac6235dc3e4e2d03822922646051a341e8fcb4035',
          ],
          signaturesRequired: 1,
          timelock: 0,
        }),
      )
      expect(address).toBe(
        '69e52c7d3f57df42b9736a1b5a0e67ab2e4a1cda4b0e5c0c858929a5284d843278a7ce009198',
      )
    })
    it('invalid', async () => {
      const sdk = await initSDKTest()
      expectError(
        sdk.wallet.addressFromUnlockConditions({
          publicKeys: ['invalid public key'],
          signaturesRequired: 1,
          timelock: 0,
        }),
        'decoding <algorithm>:<key> failed: no separator',
      )
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
      const { address } = expectResult(
        sdk.wallet.addressFromSpendPolicy(spendPolicy),
      )
      expect(address).toEqual(
        '170bf8f730c072a881edf9be3c08d0491f23810f7344125444ebff4bd8855d98dd9159fe1cea',
      )
    })
  })
  describe('encodeTransaction', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const txn = getTransaction()
      const { encodedTransaction } = expectResult(
        sdk.wallet.encodeTransaction(txn),
      )
      expect(encodedTransaction).toBeDefined()
    })
  })
  describe('transactionId', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const txn = getTransaction()
      const { id } = expectResult(sdk.wallet.transactionId(txn))
      expect(id).toEqual(
        '21cedbd4948a11132d54b278a9d0a51e23dbf03a727e01fe08875b7073ae9912',
      )
    })
  })
  describe('v2TransactionId', () => {
    it('valid', async () => {
      const sdk = await initSDKTest()
      const txn = getV2Transaction()
      const { id } = expectResult(sdk.wallet.v2TransactionId(txn))
      expect(id).toEqual(
        'bbd188c5826bc777738db3537ab112a9cffc3cdb73f5804744893b57e61f4a05',
      )
    })
  })
  describe('signTransaction', () => {
    it('signs a valid transaction', async () => {
      const sdk = await initSDKTest()
      const { privateKey } = expectResult(
        sdk.wallet.keyPairFromSeedPhrase(mockPhrase!, 0),
      )
      const { signature } = expectResult(
        sdk.wallet.signTransactionV1(
          getConsensusState(),
          getConsensusNetwork(),
          getTransaction(),
          0,
          privateKey!,
        ),
      )
      expect(signature).toEqual(
        'xY+P4e5aCBR0hKU699OmTsqAOXlLbEdTQvDYknsE0xcrPtcoYcGDxz6H1xm3gvspHb/os+CxCICVqSZLyXtvBg==',
      )
    })
    it('errors if the signature index is invalid', async () => {
      const sdk = await initSDKTest()
      const { privateKey } = expectResult(
        sdk.wallet.keyPairFromSeedPhrase(mockPhrase!, 0),
      )
      expectError(
        sdk.wallet.signTransactionV1(
          getConsensusState(),
          getConsensusNetwork(),
          getTransaction(),
          1,
          privateKey!,
        ),
        'signature index out of range: 1',
      )
    })
    it('errors if the private key is invalid', async () => {
      const sdk = await initSDKTest()
      expectError(
        sdk.wallet.signTransactionV1(
          getConsensusState(),
          getConsensusNetwork(),
          getTransaction(),
          1,
          'invalid private key',
        ),
        "error decoding private key: encoding/hex: invalid byte: U+0069 'i'",
      )
    })
  })
})

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
