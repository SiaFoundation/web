import { Transaction } from '@siafoundation/types'
import {
  useWalletOutputsSiacoin,
  useWalletOutputsSiafund,
} from '@siafoundation/walletd-react'
import { useWallets } from '../../../contexts/wallets'
import { useCallback } from 'react'
import { useWalletAddresses } from '../../../hooks/useWalletAddresses'
import { signTransactionLedgerV1 } from '../../../lib/signLedgerV1'
import { useLedger } from '../../../contexts/ledger'

export function useSignV1({ cancel }: { cancel: (t: Transaction) => void }) {
  const { wallet } = useWallets()
  const walletId = wallet?.id
  const siacoinOutputs = useWalletOutputsSiacoin({
    disabled: !walletId,
    params: {
      id: walletId,
    },
  })
  const siafundOutputs = useWalletOutputsSiafund({
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
      const signResponse = await signTransactionLedgerV1({
        device,
        transaction: fundedTransaction,
        toSign,
        addresses,
        siacoinOutputs: siacoinOutputs.data?.outputs,
        siafundOutputs: siafundOutputs.data?.outputs,
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
    [device, addresses, siacoinOutputs.data, siafundOutputs.data, cancel],
  )

  return sign
}
