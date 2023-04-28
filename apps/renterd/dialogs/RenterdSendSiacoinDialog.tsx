import { useCallback } from 'react'
import { WalletSendSiacoinDialog } from '@siafoundation/design-system'
import {
  useTxPoolBroadcast,
  useWalletBalance,
  useWalletFund,
  useWalletSign,
} from '@siafoundation/react-renterd'
import { useDialog } from '../contexts/dialog'
import { mutate } from 'swr'
import BigNumber from 'bignumber.js'

export function RenterdSendSiacoinDialog() {
  const { dialog, openDialog, closeDialog } = useDialog()
  const balance = useWalletBalance()

  const fund = useWalletFund()
  const sign = useWalletSign()
  const broadcast = useTxPoolBroadcast()
  const send = useCallback(
    ({ sc, address }: { sc: BigNumber; address: string }) => {
      const func = async () => {
        const fundResponse = await fund.post({
          payload: {
            amount: sc.toString(),
            transaction: {
              siacoinOutputs: [
                {
                  address: address,
                  value: sc.toString(),
                },
              ],
            },
          },
        })
        if (!fundResponse.data) {
          return {
            error: fundResponse.error,
          }
        }
        const signResponse = await sign.post({
          payload: {
            transaction: fundResponse.data.transaction,
            toSign: fundResponse.data.toSign,
            coveredFields: {
              WholeTransaction: true,
            },
          },
        })
        if (!signResponse.data) {
          return {
            error: signResponse.error,
          }
        }
        const broadcastResponse = await broadcast.post({
          payload: [signResponse.data],
        })
        if (broadcastResponse.error) {
          return {
            error: broadcastResponse.error,
          }
        }
        setTimeout(() => {
          mutate('/bus/wallet/pending')
        }, 2000)
        return {
          transaction: signResponse.data,
        }
      }
      return func()
    },
    [fund, sign, broadcast]
  )

  return (
    <WalletSendSiacoinDialog
      balance={balance.data ? new BigNumber(balance.data) : undefined}
      send={send}
      open={dialog === 'sendSiacoin'}
      onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
    />
  )
}
