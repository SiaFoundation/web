import {
  useConsensusNetwork,
  useWalletOutputs,
  useConsensusTipState,
} from '@siafoundation/react-walletd'
import { useWallets } from '../../contexts/wallets'
import { useCallback } from 'react'
import { signTransactionSeed } from '../../lib/signSeed'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'
import { SendParams } from '../_sharedWalletSend/types'
import { useBroadcast } from '../_sharedWalletSend/useBroadcast'
import { useCancel } from '../_sharedWalletSend/useCancel'
import { useFund } from '../_sharedWalletSend/useFund'

export function useSignAndBroadcast() {
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
  const fund = useFund()
  const cancel = useCancel()
  const broadcast = useBroadcast({ cancel })

  return useCallback(
    async ({ seed, params }: { seed: string; params: SendParams }) => {
      if (!addresses) {
        return
      }

      const { address, mode, siacoin, siafund, fee } = params
      // fund
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
      const { signedTransaction, error: signingError } =
        await signTransactionSeed({
          seed,
          transaction: fundedTransaction,
          toSign,
          cs: cs.data,
          cn: cn.data,
          addresses,
          siacoinOutputs: outputs.data?.siacoinOutputs,
          siafundOutputs: outputs.data?.siafundOutputs,
        })
      if (signingError) {
        cancel(fundedTransaction)
        return {
          error: signingError,
        }
      }

      // if successfully signed cache the seed
      saveWalletSeed(walletId, seed)

      // broadcast
      return broadcast({ signedTransaction })
    },
    [
      cancel,
      addresses,
      fund,
      walletId,
      cs.data,
      cn.data,
      outputs.data,
      saveWalletSeed,
      broadcast,
    ]
  )
}
