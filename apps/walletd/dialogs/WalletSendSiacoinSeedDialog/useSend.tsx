import {
  useTxPoolBroadcast,
  useWalletFund,
  useConsensusNetwork,
  useWalletOutputs,
  useConsensusTipState,
  useWalletRelease,
} from '@siafoundation/react-walletd'
import { useWallets } from '../../contexts/wallets'
import { useCallback } from 'react'
import { signTransactionSeed } from '../../lib/signSeed'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'
import { triggerErrorToast } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'

export function useSend() {
  const { wallet, saveWalletSeed } = useWallets()
  const walletId = wallet?.id

  const outputs = useWalletOutputs({
    disabled: !walletId,
    params: {
      id: walletId,
    },
  })
  const { dataset: addresses } = useWalletAddresses({ id: walletId })
  const cs = useConsensusTipState()
  const cn = useConsensusNetwork()
  const fund = useWalletFund()
  const broadcast = useTxPoolBroadcast()
  const release = useWalletRelease()

  const cancel = useCallback(
    async (siacoinOutputIds: string[]) => {
      const response = await release.post({
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
    [walletId, release]
  )

  const send = useCallback(
    async ({
      seed,
      address,
      siacoin,
      fee,
    }: {
      seed: string
      address: string
      siacoin: BigNumber
      fee: BigNumber
    }) => {
      if (!addresses) {
        return
      }
      // fund
      const fundResponse = await fund.post({
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

      // sign
      const signResponse = signTransactionSeed({
        seed,
        transaction: fundResponse.data?.transaction,
        toSign: fundResponse.data?.toSign,
        cs: cs.data,
        cn: cn.data,
        addresses,
        siacoinOutputs: outputs.data?.siacoinOutputs,
      })
      if (signResponse.error) {
        cancel(
          fundResponse.data.transaction.siacoinInputs.map((i) => i.parentID)
        )
        return {
          error: signResponse.error,
        }
      }

      // if successfully signed cache the seed
      saveWalletSeed(walletId, seed)

      // broadcast
      const broadcastResponse = await broadcast.post({
        payload: [signResponse.transaction],
      })
      if (broadcastResponse.error) {
        cancel(
          fundResponse.data.transaction.siacoinInputs.map((i) => i.parentID)
        )
        return {
          error: broadcastResponse.error,
        }
      }

      return {
        // Need transaction ID, but its not part of transaction object
        // transactionId: signResponse.data.??,
      }
    },
    [
      cancel,
      addresses,
      fund,
      walletId,
      cs.data,
      cn.data,
      outputs.data?.siacoinOutputs,
      saveWalletSeed,
      broadcast,
    ]
  )

  return send
}
