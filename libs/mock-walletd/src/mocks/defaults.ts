import { Page } from 'playwright'
import { mockApiSiaCentralExchangeRates } from '@siafoundation/mock-sia-central'
import { mockApiSyncerPeers } from './peers'
import { mockApiConsensusTip } from './consensusTip'
import { mockApiConsensusTipState } from './consensusTipState'
import { mockApiConsensusNetwork } from './consensusNetwork'
import { mockApiWallets } from './wallets'
import { mockApiTxPoolBroadcast } from './txPoolBroadcast'
import { mockApiWallet } from './wallet'
import { mockApiRescan } from './rescan'
import { RescanResponse } from '@siafoundation/react-walletd'

type Responses = {
  rescan?: RescanResponse
}

export async function mockApiDefaults({
  page,
  responses,
}: {
  page: Page
  responses?: Responses
}) {
  await mockApiSiaCentralExchangeRates({ page })
  await mockApiSyncerPeers({ page })
  await mockApiConsensusTip({ page })
  await mockApiConsensusTipState({ page })
  await mockApiConsensusNetwork({ page })
  await mockApiTxPoolBroadcast({ page })
  await mockApiRescan({ page, response: responses?.rescan })
  const wallets = await mockApiWallets({ page })
  for (const wallet of wallets) {
    await mockApiWallet({ page, wallet })
  }
}
