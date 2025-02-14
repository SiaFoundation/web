import {
  useConsensusNetwork,
  useConsensusTip,
} from '@siafoundation/walletd-react'
import { WalletSendSeedDialogV2 } from './WalletSendSeedDialogV2'
import { WalletSendSeedDialogV1 } from './WalletSendSeedDialogV1'
import { isPastV2AllowHeight } from '../_sharedWalletSend/hardforkV2'

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

  const isV2Allowed = isPastV2AllowHeight({
    network: n.data?.name || 'mainnet',
    height: ct.data?.height || 0,
  })

  if (isV2Allowed) {
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
