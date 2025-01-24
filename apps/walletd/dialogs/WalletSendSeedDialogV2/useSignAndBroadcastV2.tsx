import {
  useConsensusNetwork,
  useWalletOutputsSiacoin,
  useConsensusTipState,
  useWalletOutputsSiafund,
} from '@siafoundation/walletd-react'
import { useWallets } from '../../contexts/wallets'
import { useCallback } from 'react'
import { signTransactionSeedV2 } from '../../lib/signSeedV2'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'
import { SendParamsV2 } from '../_sharedWalletSend/types'
import { useConstruct } from '../_sharedWalletSend/useConstruct'
import { useBroadcastV2 } from '../_sharedWalletSend/useBroadcastV2'
import { useCancelV2 } from '../_sharedWalletSend/useCancelV2'

export function useSignAndBroadcastV2() {
  const { wallet, cacheWalletMnemonic } = useWallets()
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
  const construct = useConstruct()
  const cancel = useCancelV2()
  const broadcast = useBroadcastV2({ cancel })

  return useCallback(
    async ({
      mnemonic,
      params,
    }: {
      mnemonic: string
      params: SendParamsV2
    }) => {
      if (!addresses) {
        return {
          error: 'No addresses found',
        }
      }

      // fund
      const {
        id,
        fundedTransaction,
        basis,
        error: fundingError,
      } = await construct(params)
      if (fundingError) {
        return {
          fundedTransaction,
          error: fundingError,
        }
      }
      console.log(
        'fundedTransaction',
        JSON.stringify(fundedTransaction, null, 2)
      )
      const signingResult = signTransactionSeedV2({
        mnemonic,
        transaction: fundedTransaction,
        consensusState: cs.data,
        consensusNetwork: cn.data,
        addresses,
        siacoinOutputs: siacoinOutputs.data,
        siafundOutputs: siafundOutputs.data,
      })

      if ('error' in signingResult) {
        cancel(fundedTransaction)
        return {
          error: signingResult.error,
        }
      }

      const { signedTransaction } = signingResult
      console.log(
        'signedTransaction',
        JSON.stringify(signedTransaction, null, 2)
      )

      // if successfully signed cache the seed
      cacheWalletMnemonic(walletId, mnemonic)

      // broadcast
      return broadcast({ id, basis, signedTransaction })
    },
    [
      cancel,
      addresses,
      construct,
      walletId,
      cs.data,
      cn.data,
      siacoinOutputs.data,
      siafundOutputs.data,
      cacheWalletMnemonic,
      broadcast,
    ]
  )
}
