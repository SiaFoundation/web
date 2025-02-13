import {
  useConsensusNetwork,
  useConsensusTip,
} from '@siafoundation/walletd-react'
import { WalletSendLedgerDialogV2 } from './WalletSendLedgerDialogV2'
import { WalletSendLedgerDialogV1 } from './WalletSendLedgerDialogV1'
import { getCurrentVersion } from '../_sharedWalletSendV2/hardforkV2'

export type WalletSendLedgerDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletSendLedgerDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSendLedgerDialog({
  params: dialogParams,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const n = useConsensusNetwork()
  const ct = useConsensusTip()

  const version = getCurrentVersion({
    network: n.data?.name || 'mainnet',
    height: ct.data?.height || 0,
  })

  if (version === 'v2') {
    return (
      <WalletSendLedgerDialogV2
        trigger={trigger}
        open={open}
        onOpenChange={onOpenChange}
        params={dialogParams}
      />
    )
  }
  return (
    <WalletSendLedgerDialogV1
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      params={dialogParams}
    />
  )
}
