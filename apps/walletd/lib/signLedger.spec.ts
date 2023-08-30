import { signTransactionLedger } from './signLedger'
import { TextEncoder, TextDecoder } from 'util'
import { loadWASMTestEnv } from './wasmTestEnv'
import Sia from '@siacentral/ledgerjs-sia'
import { LedgerDevice } from '../contexts/ledger/types'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

function getMockDevice() {
  return {
    type: 'HID',
    sia: {
      transport: {},
      getVersion: jest.fn(() => '0.4.5'),
      signTransaction: jest
        .fn()
        .mockReturnValueOnce(
          'aBXWoziWgmyiKVeKoW8pfAzDq53K4rs54N0beUIDC5ZM2ZN/3vvzVHftXoMLd6lILds26xXbKjlRNr6Ix0xpCQ=='
        )
        .mockReturnValueOnce(
          'bBXWoziWgmyiKVeKoW8pfAzDq53K4rs54N0beUIDC5ZM2ZN/3vvzVHftXoMLd6lILds26xXbKjlRNr6Ix0xpCQ=='
        ),
    } as unknown as Sia,
    transport: {
      forget: jest.fn(),
      deviceModel: {
        productName: 'Ledger Nano S',
      },
      _disconnectEmitted: false,
    },
  } as LedgerDevice
}

describe('signLedger', () => {
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
      })
    ).toEqual({
      transaction: {
        ...getTransaction(),
        signatures: [
          {
            parentID:
              '5ee74cab3a1f83c46f5ae76533662b2b9a63e5c58011dd663ab58b0ae42b0ff5',
            publicKeyIndex: 0,
            coveredFields: {
              wholeTransaction: true,
            },
            signature:
              'aBXWoziWgmyiKVeKoW8pfAzDq53K4rs54N0beUIDC5ZM2ZN/3vvzVHftXoMLd6lILds26xXbKjlRNr6Ix0xpCQ==',
            timelock: 0,
          },
          {
            parentID:
              '1ee74cab3a1f83c46f5ae76533662b2b9a63e5c58011dd663ab58b0ae42b0ff1',
            publicKeyIndex: 0,
            coveredFields: {
              wholeTransaction: true,
            },
            signature:
              'bBXWoziWgmyiKVeKoW8pfAzDq53K4rs54N0beUIDC5ZM2ZN/3vvzVHftXoMLd6lILds26xXbKjlRNr6Ix0xpCQ==',
            timelock: 0,
          },
        ],
      },
    })
  })

  it('errors when a toSign utxo is missing', async () => {
    await loadWASMTestEnv()
    const device = getMockDevice()
    expect(
      await signTransactionLedger({
        device,
        transaction: getTransaction(),
        toSign: ['not in siacoinOutputs'],
        addresses: getAddresses(),
        siacoinOutputs: getSiacoinOutputs(),
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
          { id: 'id', walletId: 'id', address: getSiacoinOutputs()[0].address },
        ],
        siacoinOutputs: getSiacoinOutputs(),
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
      })
    ).toEqual({
      error: 'Missing address public key',
    })
  })
})

function getTransaction() {
  return {
    siacoinInputs: [
      {
        parentID:
          'scoid:5ee74cab3a1f83c46f5ae76533662b2b9a63e5c58011dd663ab58b0ae42b0ff5',
        unlockConditions: {
          signaturesRequired: 1,
          timelock: 0,
          publicKeys: [
            'ed25519:2b11e0b06fbb6e5d9c36c2cfa794ed2e761c97b98e344af3a09f75a0b732844b',
          ],
        },
      },
      {
        parentID:
          'scoid:1ee74cab3a1f83c46f5ae76533662b2b9a63e5c58011dd663ab58b0ae42b0ff1',
        unlockConditions: {
          signaturesRequired: 1,
          timelock: 0,
          publicKeys: [
            'ed25519:2b11e0b06fbb6e5d9c36c2cfa794ed2e761c97b98e344af3a09f75a0b732844b',
          ],
        },
      },
    ],
    siacoinOutputs: [
      {
        value: '1000000000000000000000000',
        address:
          'addr:eb2ee5169dd9aaab804b38f7e70043690ac21da1144990a4a28c1dcf66cd7ee9845aef03006f',
      },
      {
        value: '38000000000000000000000000',
        address:
          'addr:2df9e973f87796a5f16c783d3ffd335b02424cadcfcaf114001c6d968468a325186575ab0461',
      },
    ],
  }
}

function getToSign() {
  return [
    'h:5ee74cab3a1f83c46f5ae76533662b2b9a63e5c58011dd663ab58b0ae42b0ff5',
    'h:1ee74cab3a1f83c46f5ae76533662b2b9a63e5c58011dd663ab58b0ae42b0ff1',
  ]
}

function getAddresses() {
  return [
    {
      id: 'addr:2df9e973f87796a5f16c783d3ffd335b02424cadcfcaf114001c6d968468a325186575ab0461',
      address:
        'addr:2df9e973f87796a5f16c783d3ffd335b02424cadcfcaf114001c6d968468a325186575ab0461',
      publicKey:
        'ed25519:2b11e0b06fbb6e5d9c36c2cfa794ed2e761c97b98e344af3a09f75a0b732844b',
      index: 2,
      walletId: '33e7f136-caf2-4d71-8b70-85e94a8bd8a0',
    },
    {
      id: 'addr:4420e65716eb12eae3fe75c0af676e5534ea72a432d4a0a0fbf21158b0e7791224aaafb0888a',
      address:
        'addr:4420e65716eb12eae3fe75c0af676e5534ea72a432d4a0a0fbf21158b0e7791224aaafb0888a',
      publicKey:
        'ed25519:7ab2abfd993fc5ec056869abcc21461cac3bf7b5d6a67dae29d06e4416fef08e',
      index: 1,
      walletId: '33e7f136-caf2-4d71-8b70-85e94a8bd8a0',
    },
    {
      id: 'addr:a872a834fd268a44e13200fc177d9bb7eda8e451402ec8f57464d00e475028eb1b0689736665',
      address:
        'addr:a872a834fd268a44e13200fc177d9bb7eda8e451402ec8f57464d00e475028eb1b0689736665',
      publicKey:
        'ed25519:7874e7502b77a5b61529e1a2c889214ea29f2bdcccb9b4615d58c1cae6360eec',
      index: 0,
      walletId: '33e7f136-caf2-4d71-8b70-85e94a8bd8a0',
    },
    {
      id: 'addr:ca886db7fae7f7a0096356e836ef9d874260899895fd1f54422802da556ccf7931444293c3a3',
      address:
        'addr:ca886db7fae7f7a0096356e836ef9d874260899895fd1f54422802da556ccf7931444293c3a3',
      publicKey:
        'ed25519:237a58ecfc5a14c51dde5569990f3a874e43b76874fd363578a7bf2f258d42b4',
      index: 3,
      walletId: '33e7f136-caf2-4d71-8b70-85e94a8bd8a0',
    },
  ]
}

function getSiacoinOutputs() {
  return [
    {
      ID: 'scoid:5ee74cab3a1f83c46f5ae76533662b2b9a63e5c58011dd663ab58b0ae42b0ff5',
      value: '39000000000000000000000000',
      address:
        'addr:2df9e973f87796a5f16c783d3ffd335b02424cadcfcaf114001c6d968468a325186575ab0461',
    },
    {
      ID: 'scoid:1ee74cab3a1f83c46f5ae76533662b2b9a63e5c58011dd663ab58b0ae42b0ff1',
      value: '39000000000000000000000000',
      address:
        'addr:2df9e973f87796a5f16c783d3ffd335b02424cadcfcaf114001c6d968468a325186575ab0461',
    },
  ]
}
