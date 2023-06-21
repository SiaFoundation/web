import { Dialog } from '@siafoundation/design-system'
import { WalletAddSelectType } from '../components/WalletAddSelectType'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletAddTypeDialog({ trigger, open, onOpenChange }: Props) {
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
