import { Flex, DialogContent, TextField } from '@siafoundation/design-system'
// import { useDialog } from '../contexts/dialog'

export function StorageFolderAddDialog() {
  // const { id } = useDialog()

  return (
    <DialogContent
      title="Add Folder"
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
