import { ConsensusState } from '@siafoundation/types'
import { Page } from 'playwright'

export function getMockConsensusTipStateResponse(): ConsensusState {
  return {
    index: {
      height: 61676,
      id: 'bid:00000010d5da9002b9640d920d9eb9f7502c5c3b2a796ecf800a103920bea96f',
    },
    prevTimestamps: [
      // This timestamp being recent is used to represent a "synced" state
      new Date().toISOString(),
      '2024-03-25T17:33:24-04:00',
      '2024-03-25T17:18:32-04:00',
      '2024-03-25T17:07:59-04:00',
      '2024-03-25T17:04:15-04:00',
      '2024-03-25T16:50:56-04:00',
      '2024-03-25T16:38:22-04:00',
      '2024-03-25T16:38:12-04:00',
      '2024-03-25T16:36:56-04:00',
      '2024-03-25T16:35:17-04:00',
      '2024-03-25T16:33:59-04:00',
      '2024-03-25T16:31:16-04:00',
    ],
    depth:
      'bid:000000000001aa096ddebfbf467c56faba46eb4b3e53e72c775bf9ab202a4890',
    childTarget:
      'bid:0000005a6c49bca6186415827e15b13371c3de541dd64b7cf36a519b5128b2f8',
    siafundPool: '88386728360671853873752300000',
    oakTime: 127103000000000,
    oakTarget:
      'bid:0000000024d11bd550a6acf3718192825fa2cef5582314db8e92c4f4e5efbf4c',
    foundationPrimaryAddress:
      'addr:053b2def3cbdd078c19d62ce2b4f0b1a3c5e0ffbeeff01280efb1f8969b2f5bb4fdc680f0807',
    foundationFailsafeAddress:
      'addr:000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69',
    totalWork: '169134658088983',
    difficulty: '47498615',
    oakWork: '29864374508',
    elements: {
      numLeaves: 304383,
      trees: [
        'h:6d5fedd2f6d71cad5fc7bb35ef8bad6631c63e1323142e2a4825314b77f87d1e',
        'h:16e0c70194d2e41a21fe070ff936551b2379df8054890b95bada3c6b6a0ed3f7',
        'h:73defbf6af352d9401698492c407662b8feb62ba82e92028bf9bf0103f261844',
        'h:e22d4da6204096eef1eb0fc217c8900dce1040312cc721b9b6b3fc2be7a77da8',
        'h:4a9860d3e3ccf6cf434ed94d485b4385c62c443fd18e539998bd817a3ebed772',
        'h:6cd1e1d71a0796980193bcbb1adff069ef3f70fd12749d9e877b2bd0c8d561d1',
        'h:7aa0bdb94da13c43abd9446f77638d3e6e2ae4c36c5224a76433044c56db906c',
        'h:66c119cf5cb9ca3a174637c751988f03300e0375b43d22c82df7145841515d38',
        'h:ce8a94296e60887232915d6801a9246827661d329de47a08f25a6a3884809037',
        'h:8aa7872a63ef37e1ca8e4211700daf96068ce2cc215d4e2ab45434b5ffcab818',
        'h:3f0175c94ed31190e6da23e80d6167e2da619b460e27798750491163dbe5677b',
        'h:9f120f6489c3e3a324cd51a6f8f9dd033930688095f4440dc5f8511692b4efc1',
      ],
    },
    attestations: 0,
  }
}

export async function mockApiConsensusTipState({ page }: { page: Page }) {
  const json = getMockConsensusTipStateResponse()
  await page.route('**/api/consensus/tipstate*', async (route) => {
    await route.fulfill({ json })
  })
  return json
}
