import { useWalletBalance } from '@siafoundation/react-siad'
import { toHastings } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react'
import useSWR, { SWRResponse } from 'swr'

type WalletType = 'hot' | 'cold' | 'hw'
type WalletId = string

export type Wallet = {
  id: WalletId
  name: string
  sc: BigNumber
  sf: number
  type: WalletType
}

// const stubWallets: Wallet[] = [
//   {
//     id: '0f95ja9jwe90vj239vj2',
//     name: '0f95ja9jwe90vj239vj2',
//     sc: toHastings(15_000),
//     sf: 1,
//     type: 'hot',
//   },
//   {
//     id: '034mwxovzvipzv9dv8',
//     name: '034mwxovzvipzv9dv8',
//     sc: toHastings(353_000_000),
//     sf: 14,
//     type: 'hw',
//   },
//   {
//     id: '0bc18zzo9lw2fy13hh',
//     name: '0bc18zzo9lw2fy13hh',
//     sc: toHastings(353),
//     sf: 0,
//     type: 'cold',
//   },
// ]

const WalletsContext = createContext({} as State)
export const useWallets = () => useContext(WalletsContext)

type Props = {
  children: React.ReactNode
}

type State = {
  wallets: SWRResponse<Wallet[], string>
  activeWalletId?: WalletId
  activeWallet?: Wallet
  setActiveWallet: (walletId: WalletId) => void
}

export function WalletsProvider({ children }: Props) {
  // TODO: add multiwallet support
  const wallet = useWalletBalance()
  const wallets = useSWR(['wallets', wallet], () =>
    wallet.data
      ? [
          {
            id: 'default',
            name: 'Default',
            sc: toHastings(String(wallet.data.siacoins)),
            sf: wallet.data.siafunds,
            type: 'hot' as WalletType,
          },
        ]
      : []
  )

  const [activeWalletId, setActiveWallet] = useState<WalletId>()

  useEffect(() => {
    if (!activeWalletId && wallets.data?.length) {
      setActiveWallet(wallets.data[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets])

  const activeWallet = useMemo(
    () => wallets.data?.find((w) => w.id === activeWalletId),
    [wallets, activeWalletId]
  )

  const value: State = {
    wallets,
    activeWalletId,
    activeWallet,
    setActiveWallet,
  }

  return (
    <WalletsContext.Provider value={value}>{children}</WalletsContext.Provider>
  )
}
