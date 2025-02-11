import { V2Transaction } from '@siafoundation/types'
import {
  useWalletOutputsSiacoin,
  useWalletOutputsSiafund,
} from '@siafoundation/walletd-react'
import { useWallets } from '../../../contexts/wallets'
import { useCallback } from 'react'
import { useWalletAddresses } from '../../../hooks/useWalletAddresses'
import { signTransactionLedgerV2 } from '../../../lib/signLedgerV2'
import { useLedger } from '../../../contexts/ledger'

export function useSignV2() {
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
    async ({ fundedTransaction }: { fundedTransaction: V2Transaction }) => {
      if (!device || !fundedTransaction) {
        return
      }
      // sign
      const signResponse = await signTransactionLedgerV2({
        device,
        transaction: fundedTransaction,
        addresses,
        siacoinOutputs: siacoinOutputs.data?.outputs,
        siafundOutputs: siafundOutputs.data?.outputs,
      })
      if ('error' in signResponse) {
        return {
          error: signResponse.error,
        }
      }
      return {
        signedTransaction: signResponse.transaction,
      }
    },
    [device, addresses, siacoinOutputs.data, siafundOutputs.data]
  )

  return sign
}
