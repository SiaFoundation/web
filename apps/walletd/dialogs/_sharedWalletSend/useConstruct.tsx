import { useWalletConstructV2Transaction } from '@siafoundation/walletd-react'
import { useWallets } from '../../contexts/wallets'
import { useCallback } from 'react'
import { SendParamsV2 } from './types'
import { WalletConstructV2TransactionPayload } from '@siafoundation/walletd-types'
import { SiacoinOutput, SiafundOutput } from '@siafoundation/types'

export function useConstruct() {
  const { wallet } = useWallets()
  const walletId = wallet?.id
  const construct = useWalletConstructV2Transaction()

  const fund = useCallback(
    async ({
      receiveAddress,
      changeAddress,
      siacoin,
      siafund,
    }: SendParamsV2) => {
      if (!receiveAddress || !changeAddress) {
        return {
          error: 'No addresses',
        }
      }

      const siacoins: SiacoinOutput[] = []
      const siafunds: SiafundOutput[] = []

      if (siacoin.gt(0)) {
        siacoins.push({
          value: siacoin.toString(),
          address: receiveAddress,
        })
      }

      if (siafund > 0) {
        siafunds.push({
          value: siafund,
          address: receiveAddress,
        })
      }

      const payload: WalletConstructV2TransactionPayload = {
        changeAddress,
        siacoins,
        siafunds,
      }

      // construct: funds txn, calculates and adds miner fees, determines utxo change.
      const fundResponse = await construct.post({
        params: {
          id: walletId,
        },
        payload,
      })
      if (fundResponse.error) {
        return {
          error: fundResponse.error,
        }
      }
      return {
        id: fundResponse.data.id,
        fundedTransaction: fundResponse.data.transaction,
        estimatedFee: fundResponse.data.estimatedFee,
        basis: fundResponse.data.basis,
      }
    },
    [walletId, construct]
  )

  return fund
}
