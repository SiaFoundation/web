import { ConsensusNetwork } from '@siafoundation/types'
import { Page } from 'playwright'

export function getMockConsensusNetworkResponse(): ConsensusNetwork {
  return {
    name: 'zen',
    initialCoinbase: '300000000000000000000000000000',
    minimumCoinbase: '300000000000000000000000000000',
    initialTarget:
      '0000000100000000000000000000000000000000000000000000000000000000',
    hardforkDevAddr: {
      height: 1,
      oldAddress:
        '000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69',
      newAddress:
        '000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69',
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
        '0000000100000000000000000000000000000000000000000000000000000000',
    },
    hardforkFoundation: {
      height: 30,
      primaryAddress:
        '053b2def3cbdd078c19d62ce2b4f0b1a3c5e0ffbeeff01280efb1f8969b2f5bb4fdc680f0807',
      failsafeAddress:
        '000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69',
    },
    hardforkV2: {
      allowHeight: 100000,
      requireHeight: 102000,
    },
  }
}

export async function mockApiConsensusNetwork({ page }: { page: Page }) {
  const json = getMockConsensusNetworkResponse()
  await page.route('**/api/consensus/network*', async (route) => {
    await route.fulfill({ json })
  })
  return json
}
