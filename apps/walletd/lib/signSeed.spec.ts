import { signTransactionSeed } from './signSeed'
import { initSDK } from '@siafoundation/sdk'
import { getMockScenarioSeedWallet } from '@siafoundation/walletd-mock'
import { getMockAddresses } from './testMocks'

beforeEach(async () => {
  await initSDK()
})

describe('signSeed', () => {
  it('builds and signs valid transaction', async () => {
    const mocks = getMockScenarioSeedWallet()
    expect(
      signTransactionSeed({
        mnemonic: mocks.mnemonic,
        transaction: mocks.walletFundResponse.transaction,
        toSign: mocks.walletFundResponse.toSign,
        consensusState: mocks.consensusState,
        consensusNetwork: mocks.consensusNetwork,
        siacoinOutputs: mocks.walletOutputsSiacoinResponse.outputs,
        siafundOutputs: mocks.walletOutputsSiafundResponse.outputs,
        addresses: getMockAddresses(mocks),
      })
    ).toMatchSnapshot()
  })

  it('errors when a toSign utxo is missing', async () => {
    const mocks = getMockScenarioSeedWallet()
    expect(
      signTransactionSeed({
        mnemonic: mocks.mnemonic,
        transaction: mocks.walletFundResponse.transaction,
        consensusState: mocks.consensusState,
        consensusNetwork: mocks.consensusNetwork,
        siacoinOutputs: mocks.walletOutputsSiacoinResponse.outputs,
        siafundOutputs: mocks.walletOutputsSiafundResponse.outputs,
        addresses: getMockAddresses(mocks),
        toSign: ['not in siacoinOutputs'],
      })
    ).toEqual({
      error: 'Missing utxo',
    })
  })

  it('errors when a public keys address is missing', async () => {
    const mocks = getMockScenarioSeedWallet()
    expect(
      signTransactionSeed({
        mnemonic: mocks.mnemonic,
        transaction: mocks.walletFundResponse.transaction,
        toSign: mocks.walletFundResponse.toSign,
        consensusState: mocks.consensusState,
        consensusNetwork: mocks.consensusNetwork,
        siacoinOutputs: mocks.walletOutputsSiacoinResponse.outputs,
        siafundOutputs: mocks.walletOutputsSiafundResponse.outputs,
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
      })
    ).toEqual({
      error: 'Missing address',
    })
  })

  it('errors when an address is missing its index', async () => {
    const mocks = getMockScenarioSeedWallet()
    expect(
      signTransactionSeed({
        mnemonic: mocks.mnemonic,
        transaction: mocks.walletFundResponse.transaction,
        toSign: mocks.walletFundResponse.toSign,
        consensusState: mocks.consensusState,
        consensusNetwork: mocks.consensusNetwork,
        siacoinOutputs: mocks.walletOutputsSiacoinResponse.outputs,
        siafundOutputs: mocks.walletOutputsSiafundResponse.outputs,
        addresses: [
          {
            id: 'id',
            walletId: 'id',
            address:
              mocks.walletOutputsSiacoinResponse.outputs[1].siacoinOutput
                .address,
            metadata: {},
          },
        ],
      })
    ).toEqual({
      error: 'Missing address index',
    })
  })

  it('errors when an address is missing its public key', async () => {
    const mocks = getMockScenarioSeedWallet()
    const addresses = getMockAddresses(mocks)
    addresses[0].metadata.unlockConditions.publicKeys[0] = undefined
    expect(
      signTransactionSeed({
        mnemonic: mocks.mnemonic,
        transaction: mocks.walletFundResponse.transaction,
        toSign: mocks.walletFundResponse.toSign,
        consensusState: mocks.consensusState,
        consensusNetwork: mocks.consensusNetwork,
        siacoinOutputs: mocks.walletOutputsSiacoinResponse.outputs,
        siafundOutputs: mocks.walletOutputsSiafundResponse.outputs,
        addresses,
      })
    ).toEqual({
      error: 'Missing address public key',
    })
  })
})
