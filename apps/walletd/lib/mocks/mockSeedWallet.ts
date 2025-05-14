import {
  Wallet,
  WalletAddress,
  WalletBalanceResponse,
  WalletConstructV2TransactionResponse,
  WalletFundSiacoinResponse,
  WalletOutputsSiacoinResponse,
  WalletOutputsSiafundResponse,
} from '@siafoundation/walletd-types'
import { toHastings } from '@siafoundation/units'
import { getMockConsensusNetworkResponse } from './mockConsensusNetwork'
import { getMockConsensusTipStateResponse } from './mockConsensusTipState'

export function getMockScenarioSeedWallet() {
  const mnemonic =
    'ridge business wish transfer home glove office salt wealth baby journey diary'

  const receiveAddress =
    '5739945c21e60afd70eaf97ccd33ea27836e0219212449f39e4b38acaa8b3119aa4150a9ef0f'
  const changeAddress =
    '170173c40ca0f39f9618da30af14c390c7ce70248a3662a7a5d3d5a8a31c9fbfa2071e9f6518'

  const newWallet: Wallet = {
    id: '100',
    name: 'test send wallet',
    description: 'wallet description',
    dateCreated: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    metadata: {
      type: 'seed',
      mnemonicHash:
        '251cc9d01333287e9c9f39fc4749095a28a3970348a6106244848d2c414a908bc81ae4982911435a045a407fb305b69e51d05ce6f9b47ef1750c1e74ca299a48',
    },
  }

  const walletBalanceResponse: WalletBalanceResponse = {
    siacoins: toHastings('100').toString(),
    immatureSiacoins: toHastings('10').toString(),
    siafunds: 10,
  }

  const walletOutputsSiacoinResponse: WalletOutputsSiacoinResponse = {
    basis: {
      height: 0,
      id: '0',
    },
    outputs: [
      {
        id: 'aa3e781330c9b3991e0141807df1327fadf114ca6c37acb9e58004f942d91dfb',
        stateElement: {
          leafIndex: 304248,
          merkleProof: [
            '0a7a4c392f78899e3c38c5cd9e6a673b2c7afec97930af539af9c8e20209aa78',
            'a1e074dc48634a234b7366a0d7ab19cd05e3e698e1d44bf07e24d75ae0c65b3c',
            '44d107342962e2068d289ce090c87b7bf0c847f734bdfad10db5546e402c3ad7',
            '64ea3e65ecd5ebc1c0ce014673148060855ce550571208b6303b8e2a83e33451',
            '19e37bf7747c6d8c7b87d2474dbbd3a8f5b26d89642f8e1af4b9b02abdfb2ea6',
            '1fc2ac9f70211a3be6f334db14feb8b327458aee49d3539770640cbdec9b4a5f',
            'defbbc18c64349f11e75537955861ececce0fadf10baec456f6c74b024820af1',
            '87d27ff868ca3b1dce59ae754eaec48239718e81e2e6f3b7b418f5a00362bcf7',
            '93d823c55fbd09de462a8e355921433b3693d63de58ea8e2780a2c2ffabd0fee',
            'a68820d6b79b2735b15c69d0fc26b11252bb27f22b9088559ed13f9420f5dda1',
            '1bbcead690290291ea9628214a121ef783411693975171803bf5716a3a6ff19b',
          ],
        },
        siacoinOutput: {
          value: '1000000000000000000000000',
          address:
            'f2dbf56b5b0c698d7fbf43f646c76169d84e597e8b37fada97348beeecaa812d400ac4ce7981',
        },
        maturityHeight: 0,
      },
      {
        id: '32e430158591b4073a6834e9f4c4b67162e348844f569f4e472896bb72efb724',
        stateElement: {
          leafIndex: 305723,
          merkleProof: [
            '8c02aeec48de589ce497ebe72fb8b527cfe022ef513fcfdc56745c84832f00ec',
            '1bf63b9959e60272fd7a48a8cecd4120a852c0e14557ea27ccad6ea2071e70b3',
            '21b7e1606e9fd677059c58a1a687682182f71ce09e071431dcaff823a3a5d49e',
            'e81ac37d3b4db6166dc1bb10ebfa49f57cbf99aababd36ee4e3e5e12082dc6dc',
            'ecc307c6c3e505d97ccf821938e5e5702ef0130d33c991ca95735f7d9706a4b8',
            '9560060ee399793f102e092afdfdbdd33692706256955e8390af552de0addfc0',
          ],
        },
        siacoinOutput: {
          value: '97988210000000000000000000',
          address:
            'f2dbf56b5b0c698d7fbf43f646c76169d84e597e8b37fada97348beeecaa812d400ac4ce7981',
        },
        maturityHeight: 0,
      },
    ],
  }

  const walletOutputsSiafundResponse: WalletOutputsSiafundResponse = {
    basis: {
      height: 0,
      id: '0',
    },
    outputs: [],
  }

  const walletFundResponse: WalletFundSiacoinResponse = {
    basis: {
      height: 0,
      id: '0',
    },
    transaction: {
      siacoinInputs: [
        {
          address:
            '7776057cdd2463eca61f83796e83152dbba28b6cb9a74831a043833051ec9f422726bfff2ee1',
          parentID:
            'aa3e781330c9b3991e0141807df1327fadf114ca6c37acb9e58004f942d91dfb',
          unlockConditions: {
            timelock: 0,
            publicKeys: null,
            signaturesRequired: 1,
          },
        },
        {
          address:
            '8886057cdd2463eca61f83796e83152dbba28b6cb9a74831a043833051ec9f422726bfff2ee1',
          parentID:
            '32e430158591b4073a6834e9f4c4b67162e348844f569f4e472896bb72efb724',
          unlockConditions: {
            timelock: 0,
            publicKeys: null,
            signaturesRequired: 1,
          },
        },
      ],
      siacoinOutputs: [
        {
          value: '1000000000000000000000000',
          address:
            '90c6057cdd2463eca61f83796e83152dbba28b6cb9a74831a043833051ec9f422726bfff2ee8',
        },
        {
          value: '97984280000000000000000000',
          address:
            'f2dbf56b5b0c698d7fbf43f646c76169d84e597e8b37fada97348beeecaa812d400ac4ce7981',
        },
      ],
      minerFees: ['3930000000000000000000'],
    },
    toSign: [
      'aa3e781330c9b3991e0141807df1327fadf114ca6c37acb9e58004f942d91dfb',
      '32e430158591b4073a6834e9f4c4b67162e348844f569f4e472896bb72efb724',
    ],
    dependsOn: null,
  }

  const walletConstructV2Response: WalletConstructV2TransactionResponse = {
    id: '0',
    basis: {
      height: 0,
      id: '0',
    },
    transaction: {
      siacoinInputs: [
        {
          parent: {
            id: 'aa3e781330c9b3991e0141807df1327fadf114ca6c37acb9e58004f942d91dfb',
            maturityHeight: 0,
            siacoinOutput: {
              value: '1000000000000000000000000',
              address:
                '90c6057cdd2463eca61f83796e83152dbba28b6cb9a74831a043833051ec9f422726bfff2ee8',
            },
            stateElement: {
              leafIndex: 304248,
              merkleProof: [
                '0a7a4c392f78899e3c38c5cd9e6a673b2c7afec97930af539af9c8e20209aa78',
                'a1e074dc48634a234b7366a0d7ab19cd05e3e698e1d44bf07e24d75ae0c65b3c',
              ],
            },
          },
          satisfiedPolicy: {
            policy: {
              type: 'uc',
              policy: {
                timelock: 0,
                publicKeys: [
                  'ed25519:ee122b2169bdae5776b55609e384e0c58372cd5c529d4edc9b9918b26f8e5535',
                ],
                signaturesRequired: 1,
              },
            },
          },
        },
        {
          parent: {
            id: '32e430158591b4073a6834e9f4c4b67162e348844f569f4e472896bb72efb724',
            maturityHeight: 0,
            siacoinOutput: {
              value: '97984280000000000000000000',
              address:
                'f2dbf56b5b0c698d7fbf43f646c76169d84e597e8b37fada97348beeecaa812d400ac4ce7981',
            },
            stateElement: {
              leafIndex: 305723,
              merkleProof: [
                '8c02aeec48de589ce497ebe72fb8b527cfe022ef513fcfdc56745c84832f00ec',
                '1bf63b9959e60272fd7a48a8cecd4120a852c0e14557ea27ccad6ea2071e70b3',
              ],
            },
          },
          satisfiedPolicy: {
            policy: {
              type: 'uc',
              policy: {
                timelock: 0,
                publicKeys: [
                  'ed25519:ee122b2169bdae5776b55609e384e0c58372cd5c529d4edc9b9918b26f8e5535',
                ],
                signaturesRequired: 1,
              },
            },
          },
        },
      ],
      siacoinOutputs: [
        {
          value: '1000000000000000000000000',
          address:
            '90c6057cdd2463eca61f83796e83152dbba28b6cb9a74831a043833051ec9f422726bfff2ee8',
        },
        {
          value: '97984280000000000000000000',
          address:
            'f2dbf56b5b0c698d7fbf43f646c76169d84e597e8b37fada97348beeecaa812d400ac4ce7981',
        },
      ],
      minerFee: '3930000000000000000000',
    },
    estimatedFee: '0',
  }

  const walletAddressesResponse: WalletAddress[] = [
    {
      address:
        'f2dbf56b5b0c698d7fbf43f646c76169d84e597e8b37fada97348beeecaa812d400ac4ce7981',
      description: '',
      spendPolicy: {
        type: 'uc',
        policy: {
          timelock: 0,
          signaturesRequired: 1,
          publicKeys: [
            'ed25519:ee122b2169bdae5776b55609e384e0c58372cd5c529d4edc9b9918b26f8e5535',
          ],
        },
      },
      metadata: {
        index: 0,
      },
    },
    {
      address:
        '90c6057cdd2463eca61f83796e83152dbba28b6cb9a74831a043833051ec9f422726bfff2ee8',
      description: '',
      spendPolicy: {
        type: 'uc',
        policy: {
          timelock: 0,
          signaturesRequired: 1,
          publicKeys: [
            'ed25519:624d6d477a8f4ceac873e6dd9138740f9322cb34a24246f96f9d64c021172f43',
          ],
        },
      },
      metadata: {
        index: 1,
      },
    },
    {
      address:
        '170173c40ca0f39f9618da30af14c390c7ce70248a3662a7a5d3d5a8a31c9fbfa2071e9f6518',
      description: '',
      spendPolicy: {
        type: 'uc',
        policy: {
          timelock: 0,
          signaturesRequired: 1,
          publicKeys: [
            'ed25519:65cac661a4acf36847c0aa67cbc6956e3449fd82a7430cfd673ea7fedbfcf5fa',
          ],
        },
      },
      metadata: {
        index: 2,
      },
    },
  ]

  return {
    consensusState: getMockConsensusTipStateResponse(),
    consensusNetwork: getMockConsensusNetworkResponse(),
    mnemonic,
    receiveAddress,
    changeAddress,
    newWallet,
    walletBalanceResponse,
    walletOutputsSiacoinResponse,
    walletOutputsSiafundResponse,
    walletFundResponse,
    walletConstructV2Response,
    walletAddressesResponse,
  }
}
