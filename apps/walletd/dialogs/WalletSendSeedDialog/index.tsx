import { WalletSendSeedDialogV2 } from './WalletSendSeedDialogV2'
import { WalletSendSeedDialogV1 } from './WalletSendSeedDialogV1'
import { useIsPastV2AllowHeight } from '../_sharedWalletSend/hardforkV2'

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
  const isV2Allowed = useIsPastV2AllowHeight()

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
