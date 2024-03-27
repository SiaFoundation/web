import { Page } from 'playwright'
import {
  Wallet,
  WalletAddressesResponse,
  WalletBalanceResponse,
  WalletFundResponse,
  WalletOutputsSiacoinResponse,
} from '@siafoundation/react-walletd'
import { mockSiaCentralExchangeRates } from './siaCentralExchangeRates'
import { mockApiSyncerPeers } from './peers'
import { mockApiConsensusTip } from './consensusTipState'
import { mockApiConsensusTipState } from './consensusTip'
import { mockApiConsensusNetwork } from './consensusNetwork'
import { mockApiWallets } from './wallets'
import { mockApiWalletBalance } from './walletBalance'
import { mockApiWalletAddresses } from './walletAddresses'
import { mockApiWalletEvents } from './walletEvents'
import { mockApiWalletTxpool } from './walletTxpool'
import { mockApiWalletOutputsSiacoin } from './walletOutputsSiacoin'
import { mockApiWalletOutputsSiafund } from './walletOutputsSiafund'
import { mockApiWalletFund } from './walletFund'
import { mockApiTxpoolBroadcast } from './txpoolBroadcast'
import { mockApiWalletRelease } from './walletRelease'

export async function mockApiDefaults({ page }: { page: Page }) {
  await mockSiaCentralExchangeRates({ page })
  await mockApiSyncerPeers({ page })
  await mockApiConsensusTip({ page })
  await mockApiConsensusTipState({ page })
  await mockApiConsensusNetwork({ page })
  await mockApiTxpoolBroadcast({ page })
  const wallets = await mockApiWallets({ page })
  for (const wallet of wallets) {
    await mockApiWallet({ page, wallet })
  }
}

export async function mockApiWallet({
  page,
  wallet,
  responses = {},
}: {
  page: Page
  wallet: Wallet
  responses?: {
    balance?: WalletBalanceResponse
    outputsSiacoin?: WalletOutputsSiacoinResponse
    fund?: WalletFundResponse
    addresses?: WalletAddressesResponse
  }
}) {
  await mockApiWalletBalance({
    page,
    walletId: wallet.id,
    response: responses.balance,
  })
  await mockApiWalletAddresses({
    page,
    walletId: wallet.id,
    response: responses.addresses,
  })
  await mockApiWalletEvents({ page, walletId: wallet.id })
  await mockApiWalletTxpool({ page, walletId: wallet.id })
  await mockApiWalletOutputsSiacoin({
    page,
    walletId: wallet.id,
    response: responses.outputsSiacoin,
  })
  await mockApiWalletOutputsSiafund({ page, walletId: wallet.id })
  await mockApiWalletFund({
    page,
    walletId: wallet.id,
    response: responses.fund,
  })
  await mockApiWalletRelease({
    page,
    walletId: wallet.id,
  })
}
