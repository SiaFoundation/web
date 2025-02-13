import {
  useConsensusNetwork,
  useWalletOutputsSiacoin,
  useConsensusTipState,
  useWalletOutputsSiafund,
} from '@siafoundation/walletd-react'
import { useWallets } from '../../../contexts/wallets'
import { useCallback } from 'react'
import { signTransactionSeedV1 } from '../../../lib/signSeedV1'
import { useWalletAddresses } from '../../../hooks/useWalletAddresses'
import { SendParamsV1 } from '../../_sharedWalletSendV1/typesV1'
import { useBroadcastV1 } from '../../_sharedWalletSendV1/useBroadcastV1'
import { useCancelV1 } from '../../_sharedWalletSendV1/useCancelV1'
import { useFundV1 } from '../../_sharedWalletSendV1/useFundV1'

export function useSignAndBroadcastV1() {
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
  const fund = useFundV1()
  const cancel = useCancelV1()
  const broadcast = useBroadcastV1({ cancel })

  return useCallback(
    async ({
      mnemonic,
      params,
    }: {
      mnemonic: string
      params: SendParamsV1
    }) => {
      if (!addresses) {
        return {
          error: 'No addresses found',
        }
      }

      // fund
      const {
        fundedTransaction,
        toSign,
        error: fundingError,
        basis,
      } = await fund(params)
      if (fundingError) {
        return {
          fundedTransaction,
          error: fundingError,
        }
      }
      const { signedTransaction, error: signingError } = signTransactionSeedV1({
        mnemonic,
        transaction: fundedTransaction,
        toSign,
        consensusState: cs.data,
        consensusNetwork: cn.data,
        addresses,
        siacoinOutputs: siacoinOutputs.data?.outputs,
        siafundOutputs: siafundOutputs.data?.outputs,
      })
      if (signingError) {
        cancel(fundedTransaction)
        return {
          error: signingError,
        }
      }

      // if successfully signed cache the seed
      cacheWalletMnemonic(walletId, mnemonic)

      // broadcast
      return broadcast({ signedTransaction, basis })
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
      cacheWalletMnemonic,
      broadcast,
    ]
  )
}
