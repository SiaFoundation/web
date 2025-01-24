import { Transaction } from '@siafoundation/types'
import { useCallback } from 'react'
import { SendParamsV1 } from '../_sharedWalletSend/types'

type Props = {
  fund: (params: SendParamsV1) => Promise<{
    fundedTransaction?: Transaction
    toSign?: string[]
    error?: string
  }>
  cancel: (transaction: Transaction) => Promise<void>
  sign: ({
    fundedTransaction,
    toSign,
  }: {
    fundedTransaction: Transaction
    toSign: string[]
  }) => Promise<{
    signedTransaction?: Transaction
    error?: string
  }>
}

export function useFundAndSign({ fund, cancel, sign }: Props) {
  const fundAndSign = useCallback(
    async (params: SendParamsV1) => {
      const {
        fundedTransaction,
        toSign,
        error: fundingError,
      } = await fund(params)
      if (fundingError) {
        return {
          fundedTransaction,
          error: fundingError,
        }
      }
      const { signedTransaction, error: signingError } = await sign({
        fundedTransaction,
        toSign,
      })
      if (signingError) {
        cancel(fundedTransaction)
        return {
          fundedTransaction,
          error: signingError,
        }
      }
      return {
        signedTransaction,
      }
    },
    [fund, sign, cancel]
  )

  return fundAndSign
}
