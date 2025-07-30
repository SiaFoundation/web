import { initSDK } from '@siafoundation/sdk'
import { signTransactionLedgerV2 } from './signLedgerV2'
import { getMockAddresses, getMockDevice } from './testMocks'
import { getMockScenarioSeedWallet } from './mocks/mockSeedWallet'

beforeEach(async () => {
  await initSDK()
})

describe('signLedgerV2', () => {
  describe('siacoin', () => {
    it('builds and signs valid transaction', async () => {
      const device = getMockDevice()
      const mocks = getMockScenarioSeedWallet()
      expect(
        await signTransactionLedgerV2({
          device,
          transaction: mocks.walletConstructV2Response.transaction,
          addresses: getMockAddresses(mocks),
        }),
      ).toMatchSnapshot()
    })

    it('errors when a public keys address is missing', async () => {
      const device = getMockDevice()
      const mocks = getMockScenarioSeedWallet()
      expect(
        await signTransactionLedgerV2({
          device,
          transaction: mocks.walletConstructV2Response.transaction,
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
        await signTransactionLedgerV2({
          device,
          transaction: mocks.walletConstructV2Response.transaction,
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
