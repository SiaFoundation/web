import { toSiacoins } from '@siafoundation/sia-js'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWalletBalance } from '@siafoundation/react-core'

type Props = {
  isOffer?: boolean
  currency: 'SF' | 'SC'
  value?: BigNumber
}

export function useHasBalance({ currency, isOffer, value }: Props) {
  const { data: wallet } = useWalletBalance()

  return useMemo(() => {
    if (!isOffer || !value) {
      return true
    }
    if (currency === 'SC') {
      return toSiacoins(wallet?.siacoins || 0).gte(value)
    }
    const sfBalance = new BigNumber(wallet?.siafunds || 0)

    return sfBalance.gte(value)
  }, [isOffer, currency, value, wallet])
}
