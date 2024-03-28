import { signTransactionSeed } from './signSeed'
import { TextEncoder, TextDecoder } from 'util'
// import { loadWASMTestEnv } from './wasmTestEnv'
import {
  getAddresses,
  getConsensusNetwork,
  getConsensusState,
  getSiacoinOutputs,
  getSiafundOutputs,
  getToSign,
  getTransaction,
} from './testMocks'
import { initSDK } from '@siafoundation/sdk'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// TODO: update to a mnemonic
const mnemonic =
  '352ef42e07c0fe6e57d15ace7a7ac6cef8ddd187c76c1131fc172967e817ff58'

describe('signSeed', () => {
  it('builds and signs valid transaction', async () => {
    // await loadWASMTestEnv()
    // TODO: figure out init
    await initSDK()
    expect(
      signTransactionSeed({
        mnemonic,
        transaction: getTransaction(),
        toSign: getToSign(),
        cs: getConsensusState(),
        cn: getConsensusNetwork(),
        addresses: getAddresses(),
        siacoinOutputs: getSiacoinOutputs(),
        siafundOutputs: getSiafundOutputs(),
      })
    ).toMatchSnapshot()
  })

  it('errors when a toSign utxo is missing', async () => {
    // await loadWASMTestEnv()
    expect(
      signTransactionSeed({
        mnemonic,
        transaction: getTransaction(),
        toSign: ['not in siacoinOutputs'],
        cs: getConsensusState(),
        cn: getConsensusNetwork(),
        addresses: getAddresses(),
        siacoinOutputs: getSiacoinOutputs(),
        siafundOutputs: getSiafundOutputs(),
      })
    ).toEqual({
      error: 'Missing utxo',
    })
  })

  it('errors when a public keys address is missing', async () => {
    // await loadWASMTestEnv()
    expect(
      signTransactionSeed({
        mnemonic,
        transaction: getTransaction(),
        toSign: getToSign(),
        cs: getConsensusState(),
        cn: getConsensusNetwork(),
        addresses: [
          {
            id: 'id',
            walletId: 'id',
            address: 'address not in addresses',
            metadata: {
              index: 5,
            },
          },
        ],
        siacoinOutputs: getSiacoinOutputs(),
        siafundOutputs: getSiafundOutputs(),
      })
    ).toEqual({
      error: 'Missing address',
    })
  })

  it('errors when an address is missing its index', async () => {
    // await loadWASMTestEnv()
    expect(
      signTransactionSeed({
        mnemonic,
        transaction: getTransaction(),
        toSign: getToSign(),
        cs: getConsensusState(),
        cn: getConsensusNetwork(),
        addresses: [
          {
            id: 'id',
            walletId: 'id',
            address: getSiacoinOutputs()[1].siacoinOutput.address,
            metadata: {},
          },
        ],
        siacoinOutputs: getSiacoinOutputs(),
        siafundOutputs: getSiafundOutputs(),
      })
    ).toEqual({
      error: 'Missing address index',
    })
  })

  it('errors when an address is missing its public key', async () => {
    // await loadWASMTestEnv()
    const addresses = getAddresses()
    addresses[0].metadata.unlockConditions.publicKeys[0] = undefined
    expect(
      signTransactionSeed({
        mnemonic,
        transaction: getTransaction(),
        toSign: getToSign(),
        cs: getConsensusState(),
        cn: getConsensusNetwork(),
        addresses,
        siacoinOutputs: getSiacoinOutputs(),
        siafundOutputs: getSiafundOutputs(),
      })
    ).toEqual({
      error: 'Missing address public key',
    })
  })
})
