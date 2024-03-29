import { Page } from 'playwright'
import { mockApiSiaCentralExchangeRates } from '@siafoundation/mock-sia-central'
import { mockApiSyncerPeers } from './peers'
import { mockApiConsensusTip } from './consensusTipState'
import { mockApiConsensusTipState } from './consensusTip'
import { mockApiConsensusNetwork } from './consensusNetwork'
import { mockApiWallets } from './wallets'
import { mockApiTxPoolBroadcast } from './txPoolBroadcast'
import { mockApiWallet } from './wallet'

export async function mockApiDefaults({ page }: { page: Page }) {
  await mockApiSiaCentralExchangeRates({ page })
  await mockApiSyncerPeers({ page })
  await mockApiConsensusTip({ page })
  await mockApiConsensusTipState({ page })
  await mockApiConsensusNetwork({ page })
  await mockApiTxPoolBroadcast({ page })
  const wallets = await mockApiWallets({ page })
  for (const wallet of wallets) {
    await mockApiWallet({ page, wallet })
  }
}
