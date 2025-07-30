import { ChainIndex, Transaction } from '@siafoundation/types'
import { useCallback } from 'react'
import { SendParamsV1 } from '../../_sharedWalletSendV1/typesV1'

type Props = {
  fund: (params: SendParamsV1) => Promise<{
    fundedTransaction?: Transaction
    toSign?: string[]
    error?: string
    basis?: ChainIndex
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

export function useFundAndSignV1({ fund, cancel, sign }: Props) {
  const fundAndSign = useCallback(
    async (params: SendParamsV1) => {
      const {
        fundedTransaction,
        toSign,
        error: fundingError,
        basis,
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
        basis,
        signedTransaction,
      }
    },
    [fund, sign, cancel],
  )

  return fundAndSign
}
