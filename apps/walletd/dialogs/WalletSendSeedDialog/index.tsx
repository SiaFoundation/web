import {
  useConsensusNetwork,
  useConsensusTip,
} from '@siafoundation/walletd-react'
import { WalletSendSeedDialogV2 } from './WalletSendSeedDialogV2'
import { WalletSendSeedDialogV1 } from './WalletSendSeedDialogV1'
import { getCurrentVersion } from '../_sharedWalletSendV2/hardforkV2'

export type WalletSendSeedDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletSendSeedDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSendSeedDialog({
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
      <WalletSendSeedDialogV2
        trigger={trigger}
        open={open}
        onOpenChange={onOpenChange}
        params={dialogParams}
      />
    )
  }
  return (
    <WalletSendSeedDialogV1
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      params={dialogParams}
    />
  )
}
