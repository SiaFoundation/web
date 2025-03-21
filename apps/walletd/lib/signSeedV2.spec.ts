import { signTransactionSeedV2 } from './signSeedV2'
import { initSDK } from '@siafoundation/sdk'
import { getMockScenarioSeedWallet } from './mocks/mockSeedWallet'
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
        addresses: getMockAddresses(mocks),
      })
    ).toMatchSnapshot()
  })

  it('errors when a public keys address is missing', async () => {
    const mocks = getMockScenarioSeedWallet()
    expect(
      signTransactionSeedV2({
        mnemonic: mocks.mnemonic,
        transaction: mocks.walletConstructV2Response.transaction,
        consensusState: mocks.consensusState,
        consensusNetwork: mocks.consensusNetwork,
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
      error: `Missing address ${mocks.walletConstructV2Response.transaction.siacoinInputs[0].parent.siacoinOutput.address}`,
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
        addresses: [
          {
            id: 'id',
            walletId: 'id',
            address:
              mocks.walletConstructV2Response.transaction.siacoinInputs[0]
                .parent.siacoinOutput.address,
            metadata: {},
          },
        ],
      })
    ).toEqual({
      error: 'Missing address index',
    })
  })
})
