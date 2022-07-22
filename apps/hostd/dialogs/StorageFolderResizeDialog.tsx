import {
  Flex,
  DialogContent,
  getTitleId,
  TextField,
} from '@siafoundation/design-system'
import { useDialog } from '../contexts/dialog'

export function StorageFolderResizeDialog() {
  const { id } = useDialog()

  return (
    <DialogContent
      title={getTitleId('Resize Folder', id)}
      css={{
        maxWidth: '800px',
        overflow: 'hidden',
      }}
    >
      <Flex direction="column" gap="2">
        <TextField placeholder="path" />
        <TextField placeholder="size" type="number" />
      </Flex>
    </DialogContent>
  )
}
