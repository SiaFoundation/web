import { Page } from 'playwright'
import {
  Wallet,
  WalletAddressesResponse,
  WalletBalanceResponse,
  WalletFundResponse,
  WalletOutputsSiacoinResponse,
} from '@siafoundation/react-walletd'
import { mockApiWalletBalance } from './walletBalance'
import { mockApiWalletAddresses } from './walletAddresses'
import { mockApiWalletEvents } from './walletEvents'
import { mockApiWalletTxPool } from './walletTxPool'
import { mockApiWalletOutputsSiacoin } from './walletOutputsSiacoin'
import { mockApiWalletOutputsSiafund } from './walletOutputsSiafund'
import { mockApiWalletFund } from './walletFund'
import { mockApiWalletRelease } from './walletRelease'

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
  await mockApiWalletTxPool({ page, walletId: wallet.id })
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
