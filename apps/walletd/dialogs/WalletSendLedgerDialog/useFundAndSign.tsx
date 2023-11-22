import { Transaction } from '@siafoundation/react-walletd'
import { useCallback } from 'react'
import BigNumber from 'bignumber.js'

type Props = {
  fund: ({
    address,
    mode,
    siacoin,
    siafund,
    fee,
  }: {
    address: string
    mode: 'siacoin' | 'siafund'
    siacoin: BigNumber
    siafund: number
    fee: BigNumber
  }) => Promise<{
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
    async ({
      address,
      mode,
      siacoin,
      siafund,
      fee,
    }: {
      address: string
      mode: 'siacoin' | 'siafund'
      siacoin: BigNumber
      siafund: number
      fee: BigNumber
    }) => {
      const {
        fundedTransaction,
        toSign,
        error: fundingError,
      } = await fund({
        address,
        siacoin,
        siafund,
        mode,
        fee,
      })
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
