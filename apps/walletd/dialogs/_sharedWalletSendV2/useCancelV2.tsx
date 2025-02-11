import { V2Transaction } from '@siafoundation/types'
import { useWalletRelease } from '@siafoundation/walletd-react'
import { useWallets } from '../../contexts/wallets'
import { useCallback } from 'react'
import { triggerErrorToast } from '@siafoundation/design-system'

export function useCancelV2() {
  const { wallet } = useWallets()
  const walletId = wallet?.id
  const walletRelease = useWalletRelease()

  const cancel = useCallback(
    async (transaction: V2Transaction) => {
      const siacoinOutputs =
        transaction.siacoinInputs?.map((i) => i.parent.id) || []
      const siafundOutputs =
        transaction.siafundInputs?.map((i) => i.parent.id) || []
      const response = await walletRelease.post({
        params: {
          id: walletId,
        },
        payload: {
          siacoinOutputs,
          siafundOutputs,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error canceling transaction',
          body: response.error,
        })
      }
    },
    [walletId, walletRelease]
  )

  return cancel
}
