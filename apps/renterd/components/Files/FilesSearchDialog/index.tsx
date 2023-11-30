import { Dialog } from '@siafoundation/design-system'
import { FilesSearchMenu } from '../FilesSearchMenu'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
}

export function FilesSearchDialog({ open, onOpenChange, trigger }: Props) {
  return (
    <Dialog
      open={open}
      trigger={trigger}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: '!absolute !p-1 w-[450px] top-[200px]',
      }}
      bodyClassName="!px-1 !py-1"
      closeClassName="hidden"
    >
      <FilesSearchMenu />
    </Dialog>
  )
}
