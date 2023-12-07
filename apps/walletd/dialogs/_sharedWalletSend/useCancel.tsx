import { Transaction } from '@siafoundation/react-core'
import { useWalletRelease } from '@siafoundation/react-walletd'
import { useWallets } from '../../contexts/wallets'
import { useCallback } from 'react'
import { triggerErrorToast } from '@siafoundation/design-system'

export function useCancel() {
  const { wallet } = useWallets()
  const walletId = wallet?.id
  const walletRelease = useWalletRelease()

  const cancel = useCallback(
    async (transaction: Transaction) => {
      const siacoinOutputs =
        transaction.siacoinInputs?.map((i) => i.parentID) || []
      const siafundOutputs =
        transaction.siafundInputs?.map((i) => i.parentID) || []
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
        triggerErrorToast(response.error)
      }
    },
    [walletId, walletRelease]
  )

  return cancel
}
