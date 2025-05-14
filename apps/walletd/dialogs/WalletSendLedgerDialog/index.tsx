import { WalletSendLedgerDialogV2 } from './WalletSendLedgerDialogV2'
import { WalletSendLedgerDialogV1 } from './WalletSendLedgerDialogV1'
import { useIsPastV2RequireHeight } from '../_sharedWalletSend/hardforkV2'

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
  const isV2Required = useIsPastV2RequireHeight()

  if (isV2Required) {
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
