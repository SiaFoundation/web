import { Dialog } from '@siafoundation/design-system'
import { WalletAddSelectType } from '../components/WalletAddSelectType'

export type WalletAddTypeDialogParams = void

type Props = {
  open: boolean
  trigger?: React.ReactNode
  onOpenChange: (val: boolean) => void
  params?: WalletAddTypeDialogParams
}

export function WalletAddTypeDialog({ open, trigger, onOpenChange }: Props) {
  return (
    <Dialog
      title="Add Wallet"
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'max-w-[600px]',
      }}
    >
      <WalletAddSelectType />
    </Dialog>
  )
}
