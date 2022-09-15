import { useGet } from './useGet'
import { usePost } from './usePost'
import { SWROptions } from './types'
import {
  WalletTransaction,
  Transaction,
  SiacoinElement,
  WalletFundRequest,
  WalletFundResponse,
  WalletSignRequest,
} from './siaTypes'

export function useWalletBalance(options?: SWROptions<string>) {
  return useGet('wallet/balance', options)
}

export function useWalletSeedIndex(options?: SWROptions<string>) {
  return useGet('wallet/seedindex', options)
}

export function useWalletAddress(options?: SWROptions<string>) {
  return useGet('wallet/address', options)
}

export function useWalletFund() {
  return usePost<WalletFundRequest, WalletFundResponse>('wallet/fund')
}

export function useWalletSign() {
  return usePost<WalletSignRequest, Transaction>('wallet/sign')
}

export function useWalletAddresses(options?: SWROptions<string[]>) {
  return useGet('wallet/addresses', options)
}

export function useWalletTransactions(
  options?: SWROptions<WalletTransaction[]>
) {
  return useGet('wallet/transactions', options)
}

export function useWalletUtxos(options?: SWROptions<SiacoinElement[]>) {
  return useGet('wallet/outputs', options)
}

// multi wallet
// NOTE: does not exist in renterd/hostd
export interface AddressInfo {
  index: number
  description: string
}

export function useWalletAddressCreate() {
  return usePost<AddressInfo, { status: number }>('wallet/address', [
    'wallet/addresses',
    'wallet/utxos',
  ])
}
export function useWalletAddressById(
  address: string,
  options?: SWROptions<AddressInfo>
) {
  return useGet(address ? `wallet/address/${address}` : null, options)
}
