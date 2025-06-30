import { ChainIndex, Result, V2Transaction } from '@siafoundation/types'
import { useCallback } from 'react'
import { SendParamsV2 } from '../../_sharedWalletSendV2/typesV2'
import { useCancelV2 } from '../../_sharedWalletSendV2/useCancelV2'
import { useSignV2 } from './useSignV2'
import { useConstructV2 } from '../../_sharedWalletSendV2/useConstructV2'

export function useFundAndSignV2() {
  const cancel = useCancelV2()
  const sign = useSignV2()
  const construct = useConstructV2()
  const fundAndSign = useCallback(
    async (
      params: SendParamsV2,
      isBlind: boolean
    ): Promise<
      Result<{
        id: string
        basis: ChainIndex
        signedTransaction: V2Transaction
      }>
    > => {
      // Temporary
      if (!isBlind) {
        return {
          error:
            'Blind signing is temporarily required until Ledger supports V2 transactions.',
        }
      }
      const constructResult = await construct(params)
      if ('error' in constructResult) {
        return {
          error: constructResult.error,
        }
      }
      const { fundedTransaction, basis } = constructResult
      const signResult = await sign({
        fundedTransaction,
        isBlind,
      })
      if ('error' in signResult) {
        cancel(fundedTransaction)
        return {
          error: signResult.error,
        }
      }
      const { signedTransaction } = signResult
      return {
        id: constructResult.id,
        basis,
        signedTransaction,
      }
    },
    [construct, sign, cancel]
  )

  return fundAndSign
}
