import { signTransactionLedger } from './signLedger'
import { TextEncoder, TextDecoder } from 'util'
import { loadWASMTestEnv } from './wasmTestEnv'
import {
  getMockDevice,
  getAddresses,
  getSiacoinOutputs,
  getSiafundOutputs,
  getToSign,
  getTransaction,
} from './testMocks'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

describe('signLedger', () => {
  describe('siacoin', () => {
    it('builds and signs valid transaction', async () => {
      await loadWASMTestEnv()
      const device = getMockDevice()
      expect(
        await signTransactionLedger({
          device,
          transaction: getTransaction(),
          toSign: getToSign(),
          addresses: getAddresses(),
          siacoinOutputs: getSiacoinOutputs(),
          siafundOutputs: getSiafundOutputs(),
        })
      ).toMatchSnapshot()
    })

    it('errors when a toSign utxo is missing', async () => {
      await loadWASMTestEnv()
      const device = getMockDevice()
      expect(
        await signTransactionLedger({
          device,
          transaction: getTransaction(),
          toSign: [getToSign()[0], 'not in siacoinOutputs'],
          addresses: getAddresses(),
          siacoinOutputs: getSiacoinOutputs(),
          siafundOutputs: getSiafundOutputs(),
        })
      ).toEqual({
        error: 'Missing utxo',
      })
    })

    it('errors when a public keys address is missing', async () => {
      await loadWASMTestEnv()
      const device = getMockDevice()
      expect(
        await signTransactionLedger({
          device,
          transaction: getTransaction(),
          toSign: getToSign(),
          addresses: [
            {
              id: 'id',
              walletId: 'id',
              address: 'address not in addresses',
              index: 5,
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
      await loadWASMTestEnv()
      const device = getMockDevice()
      expect(
        await signTransactionLedger({
          device,
          transaction: getTransaction(),
          toSign: getToSign(),
          addresses: [
            {
              id: 'id',
              walletId: 'id',
              address: getSiacoinOutputs()[1].siacoinOutput.address,
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
      await loadWASMTestEnv()
      const device = getMockDevice()
      const addresses = getAddresses()
      addresses[0].publicKey = undefined
      expect(
        await signTransactionLedger({
          device,
          transaction: getTransaction(),
          toSign: getToSign(),
          addresses,
          siacoinOutputs: getSiacoinOutputs(),
          siafundOutputs: getSiafundOutputs(),
        })
      ).toEqual({
        error: 'Missing address public key',
      })
    })
  })
})
