import { useCallback, useMemo } from 'react'
import { WalletSendSiacoinDialog } from '@siafoundation/design-system'
import {
  useTxPoolRecommendedFee,
  useWallet,
  useWalletSend,
} from '@siafoundation/renterd-react'
import { useDialog } from '../contexts/dialog'
import BigNumber from 'bignumber.js'

const standardTxnSize = 1200 // bytes

export function RenterdSendSiacoinDialog() {
  const { dialog, onOpenChange } = useDialog()
  const wallet = useWallet()

  const recommendedFee = useTxPoolRecommendedFee()
  const fee = useMemo(
    () =>
      recommendedFee.data
        ? // This is the same estimated fee calculation that happens in the daemon.
          new BigNumber(recommendedFee.data).times(standardTxnSize)
        : new BigNumber(0),
    [recommendedFee.data],
  )

  const walletSend = useWalletSend()
  const send = useCallback(
    async ({
      address,
      hastings,
      includeFee,
    }: {
      address: string
      hastings: BigNumber
      includeFee: boolean
    }) => {
      const response = await walletSend.post({
        payload: {
          address,
          amount: hastings.toString(),
          subtractMinerFee: includeFee,
        },
      })
      if (response.error) {
        return {
          error: response.error,
        }
      }
      return {
        transactionId: response.data,
      }
    },
    [walletSend],
  )

  return (
    <WalletSendSiacoinDialog
      balance={wallet.data ? new BigNumber(wallet.data.spendable) : undefined}
      send={send}
      fee={fee}
      open={dialog === 'sendSiacoin'}
      onOpenChange={onOpenChange}
    />
  )
}
