import { initSDK } from '@siafoundation/sdk'
import { getMockScenarioSeedWallet } from '@siafoundation/walletd-mock'
import { signTransactionLedger } from './signLedger'
import { getMockAddresses, getMockDevice } from './testMocks'

beforeEach(async () => {
  await initSDK()
})

describe('signLedger', () => {
  describe('siacoin', () => {
    it('builds and signs valid transaction', async () => {
      const device = getMockDevice()
      const mocks = getMockScenarioSeedWallet()
      expect(
        await signTransactionLedger({
          device,
          transaction: mocks.walletFundResponse.transaction,
          toSign: mocks.walletFundResponse.toSign,
          siacoinOutputs: mocks.walletOutputsSiacoinResponse,
          siafundOutputs: mocks.walletOutputsSiafundResponse,
          addresses: getMockAddresses(mocks),
        }),
      ).toMatchSnapshot()
    })

    it('errors when a toSign utxo is missing', async () => {
      const device = getMockDevice()
      const mocks = getMockScenarioSeedWallet()
      expect(
        await signTransactionLedger({
          device,
          transaction: mocks.walletFundResponse.transaction,
          siacoinOutputs: mocks.walletOutputsSiacoinResponse,
          siafundOutputs: mocks.walletOutputsSiafundResponse,
          addresses: getMockAddresses(mocks),
          toSign: [mocks.walletFundResponse.toSign[0], 'not in siacoinOutputs'],
        }),
      ).toEqual({
        error: 'Missing utxo',
      })
    })

    it('errors when a public keys address is missing', async () => {
      const device = getMockDevice()
      const mocks = getMockScenarioSeedWallet()
      expect(
        await signTransactionLedger({
          device,
          transaction: mocks.walletFundResponse.transaction,
          toSign: mocks.walletFundResponse.toSign,
          siacoinOutputs: mocks.walletOutputsSiacoinResponse,
          siafundOutputs: mocks.walletOutputsSiafundResponse,
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
        error: 'Missing address',
      })
    })

    it('errors when an address is missing its index', async () => {
      const device = getMockDevice()
      const mocks = getMockScenarioSeedWallet()
      expect(
        await signTransactionLedger({
          device,
          transaction: mocks.walletFundResponse.transaction,
          toSign: mocks.walletFundResponse.toSign,
          siacoinOutputs: mocks.walletOutputsSiacoinResponse,
          siafundOutputs: mocks.walletOutputsSiafundResponse,
          addresses: [
            {
              id: 'id',
              walletId: 'id',
              address:
                mocks.walletOutputsSiacoinResponse[1].siacoinOutput.address,
              metadata: {},
            },
          ],
        }),
      ).toEqual({
        error: 'Missing address index',
      })
    })

    it('errors when an address is missing its public key', async () => {
      const device = getMockDevice()
      const mocks = getMockScenarioSeedWallet()
      const addresses = getMockAddresses(mocks)
      addresses[0].metadata.unlockConditions.publicKeys[0] = undefined
      expect(
        await signTransactionLedger({
          device,
          transaction: mocks.walletFundResponse.transaction,
          toSign: mocks.walletFundResponse.toSign,
          siacoinOutputs: mocks.walletOutputsSiacoinResponse,
          siafundOutputs: mocks.walletOutputsSiafundResponse,
          addresses,
        }),
      ).toEqual({
        error: 'Missing address public key',
      })
    })
  })
})
