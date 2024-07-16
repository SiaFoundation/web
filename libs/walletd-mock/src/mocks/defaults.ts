import { mockApiSiaCentralExchangeRates } from '@siafoundation/sia-central-mock'
import type { RescanResponse } from '@siafoundation/walletd-types'
import type { Page } from 'playwright'
import { mockApiConsensusNetwork } from './consensusNetwork'
import { mockApiConsensusTip } from './consensusTip'
import { mockApiConsensusTipState } from './consensusTipState'
import { mockApiSyncerPeers } from './peers'
import { mockApiRescan } from './rescan'
import { mockApiState } from './state'
import { mockApiTxPoolBroadcast } from './txPoolBroadcast'
import { mockApiWallet } from './wallet'
import { mockApiWallets } from './wallets'

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
  await mockApiState({ page })
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
