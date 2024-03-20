import {
  useWalletFundSiacoin,
  useWalletFundSiafund,
} from '@siafoundation/react-walletd'
import { useWallets } from '../../contexts/wallets'
import { useCallback } from 'react'
import { SendParams } from './types'

export function useFund() {
  const { wallet } = useWallets()
  const walletId = wallet?.id
  const walletFundSc = useWalletFundSiacoin()
  const walletFundSf = useWalletFundSiafund()

  const fund = useCallback(
    async ({
      receiveAddress,
      changeAddress,
      claimAddress,
      mode,
      siacoin,
      siafund,
      fee,
    }: SendParams) => {
      if (!receiveAddress || !changeAddress || !claimAddress) {
        return {
          error: 'No addresses',
        }
      }

      // fund
      if (mode === 'siacoin') {
        const fundResponse = await walletFundSc.post({
          params: {
            id: walletId,
          },
          payload: {
            amount: siacoin.plus(fee).toString(),
            changeAddress,
            transaction: {
              minerFees: [fee.toString()],
              siacoinOutputs: [
                {
                  value: siacoin.toString(),
                  address: receiveAddress,
                },
              ],
            },
          },
        })
        if (fundResponse.error) {
          return {
            error: fundResponse.error,
          }
        }
        return {
          fundedTransaction: fundResponse.data.transaction,
          toSign: fundResponse.data.toSign,
        }
      }

      if (mode === 'siafund') {
        const toSign = []
        let fundResponse = await walletFundSf.post({
          params: {
            id: walletId,
          },
          payload: {
            amount: siafund,
            changeAddress,
            claimAddress,
            transaction: {
              minerFees: [fee.toString()],
              siafundOutputs: [
                {
                  value: siafund,
                  address: receiveAddress,
                },
              ],
            },
          },
        })
        if (fundResponse.error) {
          return {
            error: fundResponse.error,
          }
        }
        toSign.push(...fundResponse.data.toSign)
        fundResponse = await walletFundSc.post({
          params: {
            id: walletId,
          },
          payload: {
            amount: fee.toString(),
            changeAddress,
            transaction: fundResponse.data.transaction,
          },
        })
        if (fundResponse.error) {
          return {
            error: fundResponse.error,
          }
        }
        toSign.push(...fundResponse.data.toSign)
        return {
          fundedTransaction: fundResponse.data.transaction,
          toSign,
        }
      }
    },
    [walletFundSc, walletFundSf, walletId]
  )

  return fund
}
