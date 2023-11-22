import { useWalletFund, useWalletFundSf } from '@siafoundation/react-walletd'
import { useWallets } from '../../contexts/wallets'
import { useCallback } from 'react'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'
import { SendParams } from './types'

export function useFund() {
  const { wallet } = useWallets()
  const walletId = wallet?.id
  const { dataset: addresses } = useWalletAddresses({ id: walletId })
  const walletFund = useWalletFund()
  const walletFundSf = useWalletFundSf()

  const fund = useCallback(
    async ({ address, mode, siacoin, siafund, fee }: SendParams) => {
      if (!addresses) {
        return {
          error: 'No addresses',
        }
      }

      // fund
      if (mode === 'siacoin') {
        const fundResponse = await walletFund.post({
          params: {
            id: walletId,
          },
          payload: {
            amount: siacoin.plus(fee).toString(),
            changeAddress: addresses[0].address,
            transaction: {
              minerFees: [fee.toString()],
              siacoinOutputs: [
                {
                  value: siacoin.toString(),
                  address,
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
            changeAddress: addresses[0].address,
            claimAddress: addresses[0].address,
            transaction: {
              minerFees: [fee.toString()],
              siafundOutputs: [
                {
                  value: siafund,
                  address,
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
        fundResponse = await walletFund.post({
          params: {
            id: walletId,
          },
          payload: {
            amount: fee.toString(),
            changeAddress: addresses[0].address,
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
    [addresses, walletFund, walletFundSf, walletId]
  )

  return fund
}
