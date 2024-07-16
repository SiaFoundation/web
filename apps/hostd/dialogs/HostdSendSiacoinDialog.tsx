import { WalletSendSiacoinDialog } from '@siafoundation/design-system'
import { useWallet, useWalletSend } from '@siafoundation/hostd-react'
import BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import { useDialog } from '../contexts/dialog'

export function HostdSendSiacoinDialog() {
  const { dialog, openDialog, closeDialog } = useDialog()
  const wallet = useWallet()
  const walletSend = useWalletSend()

  const send = useCallback(
    async ({ sc, address }: { sc: BigNumber; address: string }) => {
      const fundResponse = await walletSend.post({
        payload: {
          address,
          amount: sc.toString(),
        },
      })
      if (fundResponse.error) {
        return {
          error: fundResponse.error,
        }
      }
      return { transactionId: fundResponse.data }
    },
    [walletSend],
  )

  return (
    <WalletSendSiacoinDialog
      balance={wallet.data ? new BigNumber(wallet.data.spendable) : undefined}
      send={send}
      open={dialog === 'sendSiacoin'}
      onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
    />
  )
}
