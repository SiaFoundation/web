import { getWalletWasm } from '../lib/wasm'
import { useWallets } from '../contexts/wallets'

export function useWalletCachedSeed(walletId: string) {
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const cachedSeed = wallet?.seed
  const isSeedCached = !!cachedSeed

  const getSeedFromCacheOrForm = ({ mnemonic }: { mnemonic: string }) => {
    if (isSeedCached) {
      return { seed: cachedSeed }
    } else {
      return getWalletWasm().seedFromPhrase(mnemonic)
    }
  }

  return {
    cachedSeed,
    isSeedCached,
    getSeedFromCacheOrForm,
  }
}
