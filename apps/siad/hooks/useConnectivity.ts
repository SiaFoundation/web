import { useWalletBalance } from '@siafoundation/react-siad'

export function useConnectivity() {
  const w = useWalletBalance()

  const connError = w.error

  const daemon = connError?.status !== 504
  const wallet = !w.error

  return {
    daemon,
    wallet,
  }
}

export type Connectivity = ReturnType<typeof useConnectivity>
