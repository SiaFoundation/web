import {
  useTxPoolBroadcast,
  useWalletBalance,
  useWalletFund,
  useConsensusNetwork,
  useWalletOutputs,
  useConsensusTipState,
} from '@siafoundation/react-walletd'
import { useWallets } from '../../contexts/wallets'
import BigNumber from 'bignumber.js'
import { SendParams, SendSiacoinDialog } from '../SendSiacoinDialog'
import { useCallback } from 'react'
import { useAddresses } from '../../contexts/addresses'
import { seedSignTransaction } from '../../lib/seedSignTransaction'

export type WalletSendSiacoinDialog = {
  walletId: string
}

type Props = {
  params?: WalletSendSiacoinDialog
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSendSiacoinDialog({
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { wallet, saveWalletSeed } = useWallets()
  const walletId = wallet?.id
  const balance = useWalletBalance({
    disabled: !walletId,
    params: {
      id: walletId,
    },
  })

  const outputs = useWalletOutputs({
    disabled: !walletId,
    params: {
      id: walletId,
    },
  })
  const { dataset: addresses } = useAddresses()
  const cs = useConsensusTipState()
  const cn = useConsensusNetwork()
  const fund = useWalletFund()
  const broadcast = useTxPoolBroadcast()
  // const release = useWalletRelease()
  const send = useCallback(
    async ({ seed, address, siacoin }: SendParams) => {
      if (!addresses) {
        return
      }
      // fund
      const fundResponse = await fund.post({
        params: {
          id: walletId,
        },
        payload: {
          amount: siacoin.toString(),
          changeAddress: addresses[0].address,
          transaction: {
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
      const signResponse = seedSignTransaction({
        seed,
        transaction: fundResponse.data?.transaction,
        toSign: fundResponse.data?.toSign,
        cs: cs.data,
        cn: cn.data,
        addresses,
        siacoinOutputs: outputs.data?.siacoinOutputs,
      })
      if (signResponse.error) {
        return {
          error: signResponse.error,
        }
      }

      // if successfully signed cache the seed
      saveWalletSeed(walletId, seed)

      // return signResponse
      // broadcast
      const broadcastResponse = await broadcast.post({
        payload: [signResponse.transaction],
      })
      if (broadcastResponse.error) {
        // release.post({
        //   payload: {
        //     siacoinOutputs: signedTransaction.siacoinOutputs,
        //   },
        // })
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

  return (
    <SendSiacoinDialog
      params={params}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      balance={new BigNumber(balance.data?.siacoins || 0)}
      send={send}
    />
  )
}
