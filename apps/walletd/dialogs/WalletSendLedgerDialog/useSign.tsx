import { Transaction } from '@siafoundation/react-core'
import { useWalletOutputs } from '@siafoundation/react-walletd'
import { useWallets } from '../../contexts/wallets'
import { useCallback } from 'react'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'
import { signTransactionLedger } from '../../lib/signLedger'
import { useLedger } from '../../contexts/ledger'

export function useSign({ cancel }: { cancel: (t: Transaction) => void }) {
  const { wallet } = useWallets()
  const walletId = wallet?.id
  const outputs = useWalletOutputs({
    disabled: !walletId,
    params: {
      id: walletId,
    },
  })
  const { dataset: addresses } = useWalletAddresses({ id: walletId })

  const { device } = useLedger()
  const sign = useCallback(
    async ({
      fundedTransaction,
      toSign,
    }: {
      fundedTransaction: Transaction
      toSign: string[]
    }) => {
      if (!device || !fundedTransaction) {
        return
      }
      // sign
      const signResponse = await signTransactionLedger({
        device,
        transaction: fundedTransaction,
        toSign,
        addresses,
        siacoinOutputs: outputs.data?.siacoinOutputs,
        siafundOutputs: outputs.data?.siafundOutputs,
      })
      if (signResponse.error) {
        cancel(fundedTransaction)
        return {
          error: signResponse.error,
        }
      }
      return {
        signedTransaction: signResponse.transaction,
      }
    },
    [device, addresses, outputs.data, cancel]
  )

  return sign
}
