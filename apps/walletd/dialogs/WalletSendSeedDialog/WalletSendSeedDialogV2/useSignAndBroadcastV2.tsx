import {
  useConsensusNetwork,
  useConsensusTipState,
} from '@siafoundation/walletd-react'
import { useWallets } from '../../../contexts/wallets'
import { useCallback } from 'react'
import { signTransactionSeedV2 } from '../../../lib/signSeedV2'
import { useWalletAddresses } from '../../../hooks/useWalletAddresses'
import { SendParamsV2 } from '../../_sharedWalletSendV2/typesV2'
import { useConstructV2 } from '../../_sharedWalletSendV2/useConstructV2'
import { useBroadcastV2 } from '../../_sharedWalletSendV2/useBroadcastV2'
import { useCancelV2 } from '../../_sharedWalletSendV2/useCancelV2'
import { Result } from '@siafoundation/types'

export function useSignAndBroadcastV2() {
  const { wallet, cacheWalletMnemonic } = useWallets()
  const walletId = wallet?.id
  const { dataset: addresses } = useWalletAddresses({ id: walletId })
  const cs = useConsensusTipState()
  const cn = useConsensusNetwork()
  const construct = useConstructV2()
  const cancel = useCancelV2()
  const broadcast = useBroadcastV2()

  return useCallback(
    async ({
      mnemonic,
      params,
    }: {
      mnemonic: string
      params: SendParamsV2
    }): Promise<
      Result<{
        id: string
      }>
    > => {
      if (!addresses) {
        return {
          error: 'No addresses found',
        }
      }

      // construct
      const constructResult = await construct(params)
      if ('error' in constructResult) {
        return constructResult
      }

      // sign
      const { id, fundedTransaction, basis } = constructResult
      const signingResult = signTransactionSeedV2({
        mnemonic,
        transaction: fundedTransaction,
        consensusState: cs.data,
        consensusNetwork: cn.data,
        addresses,
      })

      if ('error' in signingResult) {
        cancel(fundedTransaction)
        return {
          error: signingResult.error,
        }
      }

      const { signedTransaction } = signingResult

      // If successfully signed cache the seed.
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
      cacheWalletMnemonic,
      broadcast,
    ],
  )
}
