import { signTransactionSeed } from './signSeed'
import { TextEncoder, TextDecoder } from 'util'
import { loadWASMTestEnv } from './wasmTestEnv'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

describe('signSeed', () => {
  it('builds and signs valid transaction', async () => {
    await loadWASMTestEnv()
    expect(
      signTransactionSeed({
        seed,
        transaction: getTransaction(),
        toSign: getToSign(),
        cs: getConsensusState(),
        cn: getConsensusNetwork(),
        addresses: getAddresses(),
        siacoinOutputs: getSiacoinOutputs(),
      })
    ).toEqual({
      transaction: {
        ...getTransaction(),
        signatures: [
          {
            parentID:
              'h:5ee74cab3a1f83c46f5ae76533662b2b9a63e5c58011dd663ab58b0ae42b0ff5',
            publicKeyIndex: 0,
            coveredFields: {
              wholeTransaction: true,
            },
            signature:
              '/NG3YBHZ/yqEhjntcbil78DV02nE+bQx20KXEzy8xKTWNnuBcbNFZmi89TPcxW1A4HizCYVgbxuuUSmKvCSMBQ==',
          },
          {
            parentID:
              'h:1ee74cab3a1f83c46f5ae76533662b2b9a63e5c58011dd663ab58b0ae42b0ff1',
            publicKeyIndex: 0,
            coveredFields: {
              wholeTransaction: true,
            },
            signature:
              'cBXWoziWgmyiKVeKoW8pfAzDq53K4rs54N0beUIDC5ZM2ZN/3vvzVHftXoMLd6lILds26xXbKjlRNr6Ix0xpCQ==',
          },
        ],
      },
    })
  })

  it('errors when a toSign utxo is missing', async () => {
    await loadWASMTestEnv()
    expect(
      signTransactionSeed({
        seed,
        transaction: getTransaction(),
        toSign: ['not in siacoinOutputs'],
        cs: getConsensusState(),
        cn: getConsensusNetwork(),
        addresses: getAddresses(),
        siacoinOutputs: getSiacoinOutputs(),
      })
    ).toEqual({
      error: 'Missing utxo',
    })
  })

  it('errors when a public keys address is missing', async () => {
    await loadWASMTestEnv()
    expect(
      signTransactionSeed({
        seed,
        transaction: getTransaction(),
        toSign: getToSign(),
        cs: getConsensusState(),
        cn: getConsensusNetwork(),
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
    expect(
      signTransactionSeed({
        seed,
        transaction: getTransaction(),
        toSign: getToSign(),
        cs: getConsensusState(),
        cn: getConsensusNetwork(),
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
    const addresses = getAddresses()
    addresses[0].publicKey = undefined
    expect(
      signTransactionSeed({
        seed,
        transaction: getTransaction(),
        toSign: getToSign(),
        cs: getConsensusState(),
        cn: getConsensusNetwork(),
        addresses,
        siacoinOutputs: getSiacoinOutputs(),
      })
    ).toEqual({
      error: 'Missing address public key',
    })
  })
})

const seed = '352ef42e07c0fe6e57d15ace7a7ac6cef8ddd187c76c1131fc172967e817ff58'

function getConsensusState() {
  return {
    index: {
      height: 32852,
      ID: 'bid:0000000465d1fa48ae591c5ae7efe10dc9706b7941c1df8df07497da6d4ebeab',
    },
    prevTimestamps: [
      '2023-08-29T14:47:25Z',
      '2023-08-29T14:38:26Z',
      '2023-08-29T14:35:19Z',
      '2023-08-29T14:34:35Z',
      '2023-08-29T14:18:21Z',
      '2023-08-29T14:14:49Z',
      '2023-08-29T14:14:10Z',
      '2023-08-29T14:13:05Z',
      '2023-08-29T14:05:45Z',
      '2023-08-29T14:03:29Z',
      '2023-08-29T13:56:54Z',
    ],
    depth:
      'bid:0000000000025e5cf498f1a8d709aa7e4780ebd97b6324e85fbfd1ed60ae4ab6',
    childTarget:
      'bid:0000000a1cfad131fdd21b6ceb41a91716099385d7d92049f7f3eefdf2f05ae7',
    siafundPool: '11998137526599968938126340000',
    oakTime: 113731000000000,
    oakTarget:
      'bid:000000000d6bc6646060a078087c4a8e02d970b3b2f4014dfa4048461702d97b',
    foundationPrimaryAddress:
      'addr:053b2def3cbdd078c19d62ce2b4f0b1a3c5e0ffbeeff01280efb1f8969b2f5bb4fdc680f0807',
    foundationFailsafeAddress:
      'addr:000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69',
  }
}

function getConsensusNetwork() {
  return {
    name: 'zen',
    initialCoinbase: '300000000000000000000000000000',
    minimumCoinbase: '300000000000000000000000000000',
    initialTarget:
      'bid:0000000100000000000000000000000000000000000000000000000000000000',
    hardforkDevAddr: {
      height: 1,
      oldAddress:
        'addr:000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69',
      newAddress:
        'addr:000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69',
    },
    hardforkTax: {
      height: 2,
    },
    hardforkStorageProof: {
      height: 5,
    },
    hardforkOak: {
      height: 10,
      fixHeight: 12,
      genesisTimestamp: '2023-01-13T08:53:20Z',
    },
    hardforkASIC: {
      height: 20,
      oakTime: 10000000000000,
      oakTarget:
        'bid:0000000100000000000000000000000000000000000000000000000000000000',
    },
    hardforkFoundation: {
      height: 30,
      primaryAddress:
        'addr:053b2def3cbdd078c19d62ce2b4f0b1a3c5e0ffbeeff01280efb1f8969b2f5bb4fdc680f0807',
      failsafeAddress:
        'addr:000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69',
    },
  } as const
}

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
