import {
  useConsensusNetwork,
  useWalletOutputsSiacoin,
  useConsensusTipState,
  useWalletOutputsSiafund,
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

  const siacoinOutputs = useWalletOutputsSiacoin({
    disabled: !walletId,
    params: {
      id: walletId,
    },
  })
  const siafundOutputs = useWalletOutputsSiafund({
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

      // fund
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
      const { signedTransaction, error: signingError } = signTransactionSeed({
        seed,
        transaction: fundedTransaction,
        toSign,
        cs: cs.data,
        cn: cn.data,
        addresses,
        siacoinOutputs: siacoinOutputs.data,
        siafundOutputs: siafundOutputs.data,
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
      siacoinOutputs.data,
      siafundOutputs.data,
      saveWalletSeed,
      broadcast,
    ]
  )
}
