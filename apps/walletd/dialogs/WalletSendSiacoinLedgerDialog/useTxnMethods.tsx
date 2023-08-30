import {
  useTxPoolBroadcast,
  useWalletFund,
  useWalletOutputs,
  useWalletRelease,
  Transaction,
} from '@siafoundation/react-walletd'
import { useWallets } from '../../contexts/wallets'
import { useCallback } from 'react'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'
import { triggerErrorToast } from '@siafoundation/design-system'
import { signTransactionLedger } from '../../lib/signLedger'
import { useLedger } from '../../contexts/ledger'
import BigNumber from 'bignumber.js'

export function useTxnMethods() {
  const { wallet } = useWallets()
  const walletId = wallet?.id
  const outputs = useWalletOutputs({
    disabled: !walletId,
    params: {
      id: walletId,
    },
  })
  const { dataset: addresses } = useWalletAddresses({ id: walletId })
  const walletFund = useWalletFund()
  const txPoolBroadcast = useTxPoolBroadcast()
  const walletRelease = useWalletRelease()

  const cancel = useCallback(
    async (transaction: Transaction) => {
      const siacoinOutputIds = transaction.siacoinInputs.map((i) => i.parentID)
      const response = await walletRelease.post({
        params: {
          id: walletId,
        },
        payload: {
          siacoinOutputs: siacoinOutputIds,
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
      }
    },
    [walletId, walletRelease]
  )

  const fund = useCallback(
    async ({
      address,
      siacoin,
      fee,
    }: {
      address: string
      siacoin: BigNumber
      fee: BigNumber
    }) => {
      if (!addresses) {
        return {
          error: 'No addresses',
        }
      }
      // fund
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
    },
    [addresses, walletFund, walletId]
  )

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
      })
      console.log(signResponse)
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
    [device, addresses, outputs.data?.siacoinOutputs, cancel]
  )

  const broadcast = useCallback(
    async ({ signedTransaction }: { signedTransaction: Transaction }) => {
      if (!signedTransaction) {
        return {
          error: 'No signed transaction',
        }
      }
      // broadcast
      const broadcastResponse = await txPoolBroadcast.post({
        payload: [signedTransaction],
      })
      if (broadcastResponse.error) {
        cancel(signedTransaction)
        return {
          error: broadcastResponse.error,
        }
      }

      return {
        // Need transaction ID, but its not part of transaction object
        // transactionId: signResponse.data.??,
      }
    },
    [cancel, txPoolBroadcast]
  )

  const fundAndSign = useCallback(
    async ({
      address,
      siacoin,
      fee,
    }: {
      address: string
      siacoin: BigNumber
      fee: BigNumber
    }) => {
      const {
        fundedTransaction,
        toSign,
        error: fundingError,
      } = await fund({
        address,
        siacoin,
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

  return {
    fundAndSign,
    broadcast,
    cancel,
  }
}
