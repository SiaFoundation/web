import { Dialog } from '@siafoundation/design-system'
import { DialogType, useDialog } from '../contexts/dialog'

type Props = {
  dialog: DialogType
  children: React.ReactNode
}

// Controlled global dialog
export function ControlledDialog({ dialog, children }: Props) {
  const { dialog: activeDialog, openDialog, closeDialog } = useDialog()

  return (
    <Dialog
      open={dialog === activeDialog}
      onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
    >
      {children}
    </Dialog>
  )
}
