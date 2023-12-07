import Sia from '@siacentral/ledgerjs-sia'
import { LedgerDevice } from '../contexts/ledger/types'
import { Transaction } from '@siafoundation/react-core'

export function getMockDevice() {
  return {
    type: 'HID',
    sia: {
      transport: {},
      getVersion: jest.fn(() => '0.4.5'),
      signTransaction: jest
        .fn()
        .mockReturnValueOnce(
          'Xt1EJckLmWXU+7HHHDN9bRV5KRuLdC4YY01LzaAMF269QH4hWV8zFkY3kCWs65svhb9HhA1Ix1MRGvhN9orBDpAA'
        )
        .mockReturnValueOnce(
          'fvmSaRzlO/n2L5tsT32e82kWqHnIjQJ8cqjWOc37TtlK6p/vIiOG+TO98HfvbgObTOYVqlKMtUyxTOjGb3bfCpAA'
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

export function getTransaction(): Transaction {
  return {
    siacoinInputs: [
      {
        parentID:
          'scoid:b222428602c8382b67a769d17e1cdc0952f37f2441a872b92671a6ed76cf22f5',
        unlockConditions: {
          timelock: 0,
          publicKeys: [
            'ed25519:b5b9196a3c19f94982bcdba250a973181b22112437832a8f818f4aa73b8add74',
          ],
          signaturesRequired: 1,
        },
      },
    ],
    siacoinOutputs: [
      {
        value: '95408980544305197274920800',
        address:
          'addr:934b885229a9f98153401d7a647a1862aede399c656f33ec8492dfffca557ca907a3d22089c8',
      },
    ],
    siafundInputs: [
      {
        parentID:
          'sfoid:b53e88ce69f19f0bf1d3496479f20b72e1133c719e82278830ee6618bb582852',
        unlockConditions: {
          timelock: 0,
          publicKeys: [
            'ed25519:8a7496aa59f17a4aae68c7e41e09d5ca94e64ba27f74cdb0b143f70dcc67b206',
          ],
          signaturesRequired: 1,
        },
        claimAddress:
          'addr:934b885229a9f98153401d7a647a1862aede399c656f33ec8492dfffca557ca907a3d22089c8',
      },
    ],
    siafundOutputs: [
      {
        value: 1,
        address:
          'addr:eb2ee5169dd9aaab804b38f7e70043690ac21da1144990a4a28c1dcf66cd7ee9845aef03006f',
      },
    ],
    minerFees: ['3930000000000000000000'],
  }
}

export function getToSign() {
  return [
    'h:b53e88ce69f19f0bf1d3496479f20b72e1133c719e82278830ee6618bb582852',
    'h:b222428602c8382b67a769d17e1cdc0952f37f2441a872b92671a6ed76cf22f5',
  ]
}

export function getAddresses() {
  return [
    {
      id: 'addr:934b885229a9f98153401d7a647a1862aede399c656f33ec8492dfffca557ca907a3d22089c8',
      address:
        'addr:934b885229a9f98153401d7a647a1862aede399c656f33ec8492dfffca557ca907a3d22089c8',
      publicKey:
        'ed25519:b5b9196a3c19f94982bcdba250a973181b22112437832a8f818f4aa73b8add74',
      index: 1,
      walletId: 'ad18cbe1-3281-4ec7-a7ad-93615009fbbc',
    },
    {
      id: 'addr:eb2ee5169dd9aaab804b38f7e70043690ac21da1144990a4a28c1dcf66cd7ee9845aef03006f',
      address:
        'addr:eb2ee5169dd9aaab804b38f7e70043690ac21da1144990a4a28c1dcf66cd7ee9845aef03006f',
      publicKey:
        'ed25519:8a7496aa59f17a4aae68c7e41e09d5ca94e64ba27f74cdb0b143f70dcc67b206',
      index: 2,
      walletId: 'ad18cbe1-3281-4ec7-a7ad-93615009fbbc',
    },
    {
      id: 'addr:fc9bc3482711e9f83642d07be385c0d434892245842b4c3f3b83b26d42cec15fe1aaac1be1ff',
      address:
        'addr:fc9bc3482711e9f83642d07be385c0d434892245842b4c3f3b83b26d42cec15fe1aaac1be1ff',
      publicKey:
        'ed25519:e80ab90d5baab391ec2e8fe31bf100f7ca3d4b5e3055eacf86afd42ab05798ba',
      index: 0,
      walletId: 'ad18cbe1-3281-4ec7-a7ad-93615009fbbc',
    },
  ]
}

export function getSiacoinOutputs() {
  return [
    {
      id: 'h:31cf3ddc946d71d219fb1fbe9a11804e607b6d5ad1b4bf7b3678a2faa701a42e',
      leafIndex: 157143,
      merkleProof: [
        'h:743645ee8b7bd0bc755f693472d8ad7fa3c5772f447fd9a46381f7851d22cb92',
        'h:9d613d671b45af9e850ba1cae69fa0fc86b218ee0d469eea7ec3df3e83c1ee2e',
        'h:9c114bd973790e6265836fd459882604494ff2656c79cdedb0173836e03fa88d',
        'h:677019b966d4e16a5f6304d49eed25adb2eb06c5bf589f4cac9e1195db348c58',
        'h:e96f6ae41fcec0f989ca00fc8697326b497515b5204569a2c21e17d4aa2e41ed',
        'h:00b971528955045e0c3ce29675188c5d2b4ddae18b78103aa2a3ae04c9fa2298',
        'h:73a8e33614511b21d98b49df6d96e92413dad51ba48007bd56a39692244e936d',
        'h:7b42dc5e0f6cfd84104bbae8279f917ae4fc383b6da5b792106e27559e14a4d5',
        'h:913008cd339f08d4c2c28e734ab617ae2917b838c67f8afa4d2d38043ca51aa3',
      ],
      siacoinOutput: {
        value: '992140000000000000000000',
        address:
          'addr:934b885229a9f98153401d7a647a1862aede399c656f33ec8492dfffca557ca907a3d22089c8',
      },
      maturityHeight: 0,
    },
    {
      id: 'h:7ebd499ad589f2b5987b4fdb7fc8b6aa5fab6eaff3f604c61b66ec5777ad9366',
      leafIndex: 157141,
      merkleProof: [
        'h:bdbb8d00932cfd2f08e9a32f322ae006583548784031447a6db03e593b619bf6',
        'h:42bb6b4c240897c17373914540cd11373a0b4d39f1c18f6bb939cd7055bb5106',
        'h:9c114bd973790e6265836fd459882604494ff2656c79cdedb0173836e03fa88d',
        'h:677019b966d4e16a5f6304d49eed25adb2eb06c5bf589f4cac9e1195db348c58',
        'h:e96f6ae41fcec0f989ca00fc8697326b497515b5204569a2c21e17d4aa2e41ed',
        'h:00b971528955045e0c3ce29675188c5d2b4ddae18b78103aa2a3ae04c9fa2298',
        'h:73a8e33614511b21d98b49df6d96e92413dad51ba48007bd56a39692244e936d',
        'h:7b42dc5e0f6cfd84104bbae8279f917ae4fc383b6da5b792106e27559e14a4d5',
        'h:913008cd339f08d4c2c28e734ab617ae2917b838c67f8afa4d2d38043ca51aa3',
      ],
      siacoinOutput: {
        value: '996070000000000000000000',
        address:
          'addr:eb2ee5169dd9aaab804b38f7e70043690ac21da1144990a4a28c1dcf66cd7ee9845aef03006f',
      },
      maturityHeight: 0,
    },
    {
      id: 'h:a1c8769809d7122dd7d99bb7ef17a7e8919a8d6967fc1607364f57eb93d8aaf5',
      leafIndex: 157144,
      merkleProof: [
        'h:e82ad5ed328410bfcb00ec4b8e1c28ac07a9da7c3038ef7ef8c0b262fd70323e',
        'h:8684f565bd83846bd2dd5fc177933635bbc901372a4a0cc72c975296453ff750',
        'h:951ba8356477c4621de211ee00e62496cff865f8daa75530867e4c9e4745cc30',
        'h:6cb63de6d3d47b25f96e88929cf87faec2afa1858c5afcffff3f59aa7533ab8b',
        'h:e96f6ae41fcec0f989ca00fc8697326b497515b5204569a2c21e17d4aa2e41ed',
        'h:00b971528955045e0c3ce29675188c5d2b4ddae18b78103aa2a3ae04c9fa2298',
        'h:73a8e33614511b21d98b49df6d96e92413dad51ba48007bd56a39692244e936d',
        'h:7b42dc5e0f6cfd84104bbae8279f917ae4fc383b6da5b792106e27559e14a4d5',
        'h:913008cd339f08d4c2c28e734ab617ae2917b838c67f8afa4d2d38043ca51aa3',
      ],
      siacoinOutput: {
        value: '55711757555233190591737',
        address:
          'addr:934b885229a9f98153401d7a647a1862aede399c656f33ec8492dfffca557ca907a3d22089c8',
      },
      maturityHeight: 45923,
    },
    {
      id: 'h:b222428602c8382b67a769d17e1cdc0952f37f2441a872b92671a6ed76cf22f5',
      leafIndex: 155364,
      merkleProof: [
        'h:e5d791d9e928201d72460af12ae664eabc8116926620d8014b5498637b59e993',
        'h:7159d4f5825b2357530e9c24bc9bd1b9bda961ea642460969bfa769d9ab84d9c',
        'h:08961a734e757612378b8afbd9d30631d3b48b5830e9631ddfed76b05215d64f',
        'h:68d3178e805c140913f987d0f56775f687a884d657d434f6f4443d536db4fdf6',
        'h:67b2e29b5b1071b8bdb431556ccd48fd3f5edad0a97a98037f79cf292ea8bd09',
        'h:b4f209894a2759c36fb1b62252cdbd1b7c90d61d86f587b5042269dc938734f1',
        'h:19b42d9757d8c3a80d64c630190f140c23887d64fd0dd482db6bf5b3986226d5',
        'h:559236122641cca96efbb897ef800c91513674af9341964b2aca16e5593aa134',
        'h:35d5d6c421b6d87dd3b15f4fe624215ba009952e4c348be727df8ebb14d54e8d',
        'h:b6af69cf68b309c8129c40f81ae2324ac6486a631d2de1bdbfcea6cac755df0e',
        'h:c1cf1a3ff946efc4f9cafa7f0ec25487c6cb2d9121f706c29f7e48b43790f8e7',
        'h:442f5a2b1a5fe821cc811e9e1b746ebefb5b50441fc510cfed1787105e957aa6',
        'h:02537976f2e05843dbab0a6c5d09447cd9cc76a391f31ce764bf3a85a513dab8',
      ],
      siacoinOutput: {
        value: '95412910544305197274920800',
        address:
          'addr:934b885229a9f98153401d7a647a1862aede399c656f33ec8492dfffca557ca907a3d22089c8',
      },
      maturityHeight: 45278,
    },
    {
      id: 'h:b77b2aa8466032d774b324734cd1998e58476ce173ad412960f3f952abdfcd6f',
      leafIndex: 157142,
      merkleProof: [
        'h:031f4de5a38fbb2df09eb9321f5f230b517f67a1b9919a9ea2f82eb9ad210f95',
        'h:9d613d671b45af9e850ba1cae69fa0fc86b218ee0d469eea7ec3df3e83c1ee2e',
        'h:9c114bd973790e6265836fd459882604494ff2656c79cdedb0173836e03fa88d',
        'h:677019b966d4e16a5f6304d49eed25adb2eb06c5bf589f4cac9e1195db348c58',
        'h:e96f6ae41fcec0f989ca00fc8697326b497515b5204569a2c21e17d4aa2e41ed',
        'h:00b971528955045e0c3ce29675188c5d2b4ddae18b78103aa2a3ae04c9fa2298',
        'h:73a8e33614511b21d98b49df6d96e92413dad51ba48007bd56a39692244e936d',
        'h:7b42dc5e0f6cfd84104bbae8279f917ae4fc383b6da5b792106e27559e14a4d5',
        'h:913008cd339f08d4c2c28e734ab617ae2917b838c67f8afa4d2d38043ca51aa3',
      ],
      siacoinOutput: {
        value: '47992140000000000000000000',
        address:
          'addr:934b885229a9f98153401d7a647a1862aede399c656f33ec8492dfffca557ca907a3d22089c8',
      },
      maturityHeight: 0,
    },
    {
      id: 'h:f961362f6e60e9b85e33b77204ffdb9aec1f601d7e5b709ca2a41f1a048fd899',
      leafIndex: 155372,
      merkleProof: [
        'h:26d070a7270455443e5f171dc75319a304d58265ebb3581229ce6bca842e403a',
        'h:d38fd124fb45cf5bd8ecfbfed3634ee93bea6478bd3504d611dd73a69a129d8a',
        'h:98d22e8c71ffece777e343aaddb97fe96f552a3762e4290c0ce69b73462ce192',
        'h:eac2f8bcf3663ebe914cf9721bef97b3d5f9422620a3c1aefd7c429846b0c044',
        'h:67b2e29b5b1071b8bdb431556ccd48fd3f5edad0a97a98037f79cf292ea8bd09',
        'h:b4f209894a2759c36fb1b62252cdbd1b7c90d61d86f587b5042269dc938734f1',
        'h:19b42d9757d8c3a80d64c630190f140c23887d64fd0dd482db6bf5b3986226d5',
        'h:559236122641cca96efbb897ef800c91513674af9341964b2aca16e5593aa134',
        'h:35d5d6c421b6d87dd3b15f4fe624215ba009952e4c348be727df8ebb14d54e8d',
        'h:b6af69cf68b309c8129c40f81ae2324ac6486a631d2de1bdbfcea6cac755df0e',
        'h:c1cf1a3ff946efc4f9cafa7f0ec25487c6cb2d9121f706c29f7e48b43790f8e7',
        'h:442f5a2b1a5fe821cc811e9e1b746ebefb5b50441fc510cfed1787105e957aa6',
        'h:02537976f2e05843dbab0a6c5d09447cd9cc76a391f31ce764bf3a85a513dab8',
      ],
      siacoinOutput: {
        value: '0',
        address:
          'addr:934b885229a9f98153401d7a647a1862aede399c656f33ec8492dfffca557ca907a3d22089c8',
      },
      maturityHeight: 45280,
    },
  ]
}

export function getSiafundOutputs() {
  return [
    {
      id: 'h:425a60eee280854b7f3eb59b1613370bcc0ae3a02859f866f80e7b310475e1e8',
      leafIndex: 155367,
      merkleProof: [
        'h:baf7bd62d901ae9b36ee5bb81bc9c9df1a06b2b24a92c91fc5006fbcfa989add',
        'h:3cf19954058b6c174edec23237efa0bb81cf71efeb9af73cbb6a8514d3a8028e',
        'h:08961a734e757612378b8afbd9d30631d3b48b5830e9631ddfed76b05215d64f',
        'h:68d3178e805c140913f987d0f56775f687a884d657d434f6f4443d536db4fdf6',
        'h:67b2e29b5b1071b8bdb431556ccd48fd3f5edad0a97a98037f79cf292ea8bd09',
        'h:b4f209894a2759c36fb1b62252cdbd1b7c90d61d86f587b5042269dc938734f1',
        'h:19b42d9757d8c3a80d64c630190f140c23887d64fd0dd482db6bf5b3986226d5',
        'h:559236122641cca96efbb897ef800c91513674af9341964b2aca16e5593aa134',
        'h:35d5d6c421b6d87dd3b15f4fe624215ba009952e4c348be727df8ebb14d54e8d',
        'h:b6af69cf68b309c8129c40f81ae2324ac6486a631d2de1bdbfcea6cac755df0e',
        'h:c1cf1a3ff946efc4f9cafa7f0ec25487c6cb2d9121f706c29f7e48b43790f8e7',
        'h:442f5a2b1a5fe821cc811e9e1b746ebefb5b50441fc510cfed1787105e957aa6',
        'h:02537976f2e05843dbab0a6c5d09447cd9cc76a391f31ce764bf3a85a513dab8',
      ],
      siafundOutput: {
        value: 99,
        address:
          'addr:934b885229a9f98153401d7a647a1862aede399c656f33ec8492dfffca557ca907a3d22089c8',
      },
      claimStart: '32152366120469300091412640000',
    },
    {
      id: 'h:b53e88ce69f19f0bf1d3496479f20b72e1133c719e82278830ee6618bb582852',
      leafIndex: 157146,
      merkleProof: [
        'h:01a92b66744b2a0198ef7a325268d8cae43858ca6f1d2677f9059327cedf6640',
        'h:19fecb42a55c9ed127354db7eaddbdf784e0dce3f2cd5d931e30d31c15bd6311',
        'h:951ba8356477c4621de211ee00e62496cff865f8daa75530867e4c9e4745cc30',
        'h:6cb63de6d3d47b25f96e88929cf87faec2afa1858c5afcffff3f59aa7533ab8b',
        'h:e96f6ae41fcec0f989ca00fc8697326b497515b5204569a2c21e17d4aa2e41ed',
        'h:00b971528955045e0c3ce29675188c5d2b4ddae18b78103aa2a3ae04c9fa2298',
        'h:73a8e33614511b21d98b49df6d96e92413dad51ba48007bd56a39692244e936d',
        'h:7b42dc5e0f6cfd84104bbae8279f917ae4fc383b6da5b792106e27559e14a4d5',
        'h:913008cd339f08d4c2c28e734ab617ae2917b838c67f8afa4d2d38043ca51aa3',
      ],
      siafundOutput: {
        value: 1,
        address:
          'addr:eb2ee5169dd9aaab804b38f7e70043690ac21da1144990a4a28c1dcf66cd7ee9845aef03006f',
      },
      claimStart: '32709483696021631997330010000',
    },
  ]
}

export function getConsensusState() {
  return {
    index: {
      height: 45962,
      ID: 'bid:000000000cb8ef1dfeb66afa78bc0b3b2d1a7a1df948efba22f7fc1a5571e79f',
    },
    prevTimestamps: [
      '2023-11-28T11:34:49-05:00',
      '2023-11-28T11:22:41-05:00',
      '2023-11-28T11:19:59-05:00',
      '2023-11-28T11:10:13-05:00',
      '2023-11-28T11:09:32-05:00',
      '2023-11-28T11:07:38-05:00',
      '2023-11-28T10:47:27-05:00',
      '2023-11-28T09:58:20-05:00',
      '2023-11-28T09:51:26-05:00',
      '2023-11-28T09:50:31-05:00',
      '2023-11-28T09:40:07-05:00',
    ],
    depth:
      'bid:00000000000203572d5b49ea0e554f31ba43d81854d4313433fbb59f6c0db0b3',
    childTarget:
      'bid:00000001724087005d8de96a9feb9a37bd483392cbb691f9cc73b5c9d14cc861',
    siafundPool: '33603845293260630383068710000',
    oakTime: 117766000000000,
    oakTarget:
      'bid:0000000001d8373aecb257ac55c0077f7fe0d8e7c02053cefe7215aa480fdc63',
    foundationPrimaryAddress:
      'addr:053b2def3cbdd078c19d62ce2b4f0b1a3c5e0ffbeeff01280efb1f8969b2f5bb4fdc680f0807',
    foundationFailsafeAddress:
      'addr:000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69',
    totalWork: '139825201060364',
    difficulty: '2969630008',
    oakWork: '596072835270',
    elements: {
      numLeaves: 157715,
      trees: [
        'h:680fc2873f62d72a4b41f93f6d919ce6271265e04f8135549cb7d0bda5df08e2',
        'h:dbdd12bdea241c262c3a39a85d37c7cf44c858e031a17843638b60285d1777ba',
        'h:9b3f0603ce5237d86e5a3ea3fcdf7b235c17ef4ad0ca7a66623e0df30bd6be62',
        'h:cf7b5de9eecc85f208d137d56b5642d193d378478fa49476af6f2d232883f552',
        'h:670e74aafd7bffe4b07d9a5c6c52111d0aadbc4cf0d76c00a8f2b8ce345999c3',
        'h:b2a0a932a907641d183201aee929b128808a980a3f08db9eba19e50e978b9bdb',
        'h:ca27be5aae09ffc0e932ce785770723c85dc0598c3e578d0b61a045245323a6f',
      ],
    },
    attestations: 0,
  }
}

export function getConsensusNetwork() {
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
      genesisTimestamp: '2023-01-13T03:53:20-05:00',
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
    hardforkV2: {
      allowHeight: 100000,
      requireHeight: 102000,
    },
  } as const
}
