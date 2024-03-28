import { useWallets } from '../contexts/wallets'

export function useWalletCachedSeed(walletId: string) {
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const cachedMnemonic = wallet?.state.mnemonic
  const isSeedCached = !!cachedMnemonic
  return {
    cachedMnemonic,
    isSeedCached,
  }
}
