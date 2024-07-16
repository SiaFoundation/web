import type {
  Wallet,
  WalletAddressesResponse,
  WalletBalanceResponse,
  WalletFundSiacoinResponse,
  WalletOutputsSiacoinResponse,
} from '@siafoundation/walletd-types'
import type { Page } from 'playwright'
import { mockApiWalletAddresses } from './walletAddresses'
import { mockApiWalletBalance } from './walletBalance'
import { mockApiWalletEvents } from './walletEvents'
import { mockApiWalletEventsUnconfirmed } from './walletEventsUnconfirmed'
import { mockApiWalletFundSiacoin } from './walletFundSiacoin'
import { mockApiWalletFundSiafund } from './walletFundSiafund'
import { mockApiWalletOutputsSiacoin } from './walletOutputsSiacoin'
import { mockApiWalletOutputsSiafund } from './walletOutputsSiafund'
import { mockApiWalletRelease } from './walletRelease'

export async function mockApiWallet({
  page,
  wallet,
  responses = {},
  expects = {},
}: {
  page: Page
  wallet: Wallet
  responses?: {
    balance?: WalletBalanceResponse
    outputsSiacoin?: WalletOutputsSiacoinResponse
    fundSiacoin?: WalletFundSiacoinResponse
    addresses?: WalletAddressesResponse
  }
  expects?: {
    fundSiacoinPost?: (data: string | null) => void
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
  await mockApiWalletEventsUnconfirmed({ page, walletId: wallet.id })
  await mockApiWalletOutputsSiacoin({
    page,
    walletId: wallet.id,
    response: responses.outputsSiacoin,
  })
  await mockApiWalletOutputsSiafund({ page, walletId: wallet.id })
  await mockApiWalletFundSiafund({
    page,
    walletId: wallet.id,
  })
  await mockApiWalletFundSiacoin({
    page,
    walletId: wallet.id,
    response: responses.fundSiacoin,
    expectPost: expects.fundSiacoinPost,
  })
  await mockApiWalletRelease({
    page,
    walletId: wallet.id,
  })
}
