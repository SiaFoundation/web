import { Page } from 'playwright'
import {
  Wallet,
  WalletAddressesResponse,
  WalletBalanceResponse,
  WalletFundResponse,
  WalletOutputsSiacoinResponse,
} from '@siafoundation/walletd-react'
import { mockApiWalletBalance } from './walletBalance'
import { mockApiWalletAddresses } from './walletAddresses'
import { mockApiWalletEvents } from './walletEvents'
import { mockApiWalletTxPool } from './walletTxPool'
import { mockApiWalletOutputsSiacoin } from './walletOutputsSiacoin'
import { mockApiWalletOutputsSiafund } from './walletOutputsSiafund'
import { mockApiWalletFundSiacoin } from './walletFundSiacoin'
import { mockApiWalletRelease } from './walletRelease'
import { mockApiWalletFundSiafund } from './walletFundSiafund'

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
    fund?: WalletFundResponse
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
  await mockApiWalletTxPool({ page, walletId: wallet.id })
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
    response: responses.fund,
    expectPost: expects.fundSiacoinPost,
  })
  await mockApiWalletRelease({
    page,
    walletId: wallet.id,
  })
}
