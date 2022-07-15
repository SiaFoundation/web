import { useGet } from './useGet'
import { usePost } from './usePost'
import { SWROptions } from './types'
import {
  AddressInfo,
  WalletBalanceResponse,
  WalletTransaction,
  WalletUTXOsResponse,
} from './siaTypes'

export function useWalletBalance(options?: SWROptions<WalletBalanceResponse>) {
  return useGet('wallet/balance', options)
}

export function useWalletSeedIndex(options?: SWROptions<string>) {
  return useGet('wallet/seedindex', options)
}

export function useWalletAddress(
  address: string,
  options?: SWROptions<AddressInfo>
) {
  return useGet(address ? `wallet/address/${address}` : null, options)
}

export function useWalletAddressCreate() {
  return usePost<AddressInfo, { status: number }>('wallet/address', [
    'wallet/addresses',
    'wallet/utxos',
  ])
}

export function useWalletAddresses(options?: SWROptions<string[]>) {
  return useGet('wallet/addresses', options)
}

export function useWalletTransactions(
  options?: SWROptions<WalletTransaction[]>
) {
  return useGet('wallet/transactions', options)
}

export function useWalletUtxos(options?: SWROptions<WalletUTXOsResponse>) {
  return useGet('wallet/utxos', options)
}
