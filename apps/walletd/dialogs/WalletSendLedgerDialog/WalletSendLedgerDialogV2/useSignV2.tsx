import { V2Transaction } from '@siafoundation/types'
import { useWallets } from '../../../contexts/wallets'
import { useCallback } from 'react'
import { useWalletAddresses } from '../../../hooks/useWalletAddresses'
import { signTransactionLedgerV2 } from '../../../lib/signLedgerV2'
import { useLedger } from '../../../contexts/ledger'
import { signTransactionLedgerV2Blind } from '../../../lib/signLedgerV2Blind'
import {
  useConsensusNetwork,
  useConsensusTipState,
} from '@siafoundation/walletd-react'

export function useSignV2() {
  const { wallet } = useWallets()
  const walletId = wallet?.id
  const { dataset: addresses } = useWalletAddresses({ id: walletId })
  const consensusState = useConsensusTipState()
  const consensusNetwork = useConsensusNetwork()
  const { device } = useLedger()
  const sign = useCallback(
    async ({
      fundedTransaction,
      isBlind,
    }: {
      fundedTransaction: V2Transaction
      isBlind: boolean
    }) => {
      if (!device) {
        return {
          error: 'No device',
        }
      }
      if (!fundedTransaction) {
        return {
          error: 'No transaction',
        }
      }
      if (!consensusState) {
        return {
          error: 'No consensus state',
        }
      }
      if (!consensusNetwork) {
        return {
          error: 'No consensus network',
        }
      }
      if (!addresses) {
        return {
          error: 'No addresses',
        }
      }
      // sign
      const signResponse = isBlind
        ? await signTransactionLedgerV2Blind({
            device,
            transaction: fundedTransaction,
            addresses,
            consensusState: consensusState.data,
            consensusNetwork: consensusNetwork.data,
          })
        : await signTransactionLedgerV2({
            device,
            transaction: fundedTransaction,
            addresses,
          })
      if ('error' in signResponse) {
        return {
          error: signResponse.error,
        }
      }
      return {
        signedTransaction: signResponse.transaction,
      }
    },
    [device, addresses, consensusState, consensusNetwork],
  )

  return sign
}
