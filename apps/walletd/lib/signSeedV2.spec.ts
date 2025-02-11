import { signTransactionSeedV2 } from './signSeedV2'
import { initSDK } from '@siafoundation/sdk'
import { getMockScenarioSeedWallet } from '@siafoundation/walletd-mock'
import { getMockAddresses } from './testMocks'

beforeEach(async () => {
  await initSDK()
})

describe('signSeedV2', () => {
  it('builds and signs valid transaction', async () => {
    const mocks = getMockScenarioSeedWallet()
    expect(
      signTransactionSeedV2({
        mnemonic: mocks.mnemonic,
        transaction: mocks.walletConstructV2Response.transaction,
        consensusState: mocks.consensusState,
        consensusNetwork: mocks.consensusNetwork,
        siacoinOutputs: mocks.walletOutputsSiacoinResponse.outputs,
        siafundOutputs: mocks.walletOutputsSiafundResponse.outputs,
        addresses: getMockAddresses(mocks),
      })
    ).toMatchSnapshot()
  })

  it('errors when an utxo is missing', async () => {
    const mocks = getMockScenarioSeedWallet()
    expect(
      signTransactionSeedV2({
        mnemonic: mocks.mnemonic,
        transaction: mocks.walletConstructV2Response.transaction,
        consensusState: mocks.consensusState,
        consensusNetwork: mocks.consensusNetwork,
        siacoinOutputs: [],
        siafundOutputs: [],
        addresses: getMockAddresses(mocks),
      })
    ).toEqual({
      error: 'Missing utxo',
    })
  })

  it('errors when a public keys address is missing', async () => {
    const mocks = getMockScenarioSeedWallet()
    expect(
      signTransactionSeedV2({
        mnemonic: mocks.mnemonic,
        transaction: mocks.walletConstructV2Response.transaction,
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
      signTransactionSeedV2({
        mnemonic: mocks.mnemonic,
        transaction: mocks.walletConstructV2Response.transaction,
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
    addresses[0].spendPolicy.policy.publicKeys[0] = undefined
    expect(
      signTransactionSeedV2({
        mnemonic: mocks.mnemonic,
        transaction: mocks.walletConstructV2Response.transaction,
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
