import { initSDK } from '@siafoundation/sdk'
import { getMockAddresses, getMockDevice } from './testMocks'
import { getMockScenarioSeedWallet } from './mocks/mockSeedWallet'
import { signTransactionLedgerV2Blind } from './signLedgerV2Blind'

beforeEach(async () => {
  await initSDK()
})

describe('signLedgerV2Blind', () => {
  describe('siacoin', () => {
    it('builds and signs valid transaction', async () => {
      const device = getMockDevice()
      const mocks = getMockScenarioSeedWallet()
      expect(
        await signTransactionLedgerV2Blind({
          device,
          transaction: mocks.walletConstructV2Response.transaction,
          consensusState: mocks.consensusState,
          consensusNetwork: mocks.consensusNetwork,
          addresses: getMockAddresses(mocks),
        }),
      ).toMatchSnapshot()
    })

    it('errors when a public keys address is missing', async () => {
      const device = getMockDevice()
      const mocks = getMockScenarioSeedWallet()
      expect(
        await signTransactionLedgerV2Blind({
          device,
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
        }),
      ).toEqual({
        error:
          'Missing address 90c6057cdd2463eca61f83796e83152dbba28b6cb9a74831a043833051ec9f422726bfff2ee8',
      })
    })

    it('errors when an address is missing its index', async () => {
      const device = getMockDevice()
      const mocks = getMockScenarioSeedWallet()
      expect(
        await signTransactionLedgerV2Blind({
          device,
          transaction: mocks.walletConstructV2Response.transaction,
          consensusState: mocks.consensusState,
          consensusNetwork: mocks.consensusNetwork,
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
        }),
      ).toEqual({
        error:
          'Missing address 90c6057cdd2463eca61f83796e83152dbba28b6cb9a74831a043833051ec9f422726bfff2ee8',
      })
    })
  })
})
