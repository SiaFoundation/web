import {
  Flex,
  DialogContent,
  getTitleId,
  Paragraph,
  Switch,
  TextField,
} from '@siafoundation/design-system'
import { useDialog } from '../contexts/dialog'

export function StorageFolderRemoveDialog() {
  const { id } = useDialog()

  return (
    <DialogContent
      title={getTitleId('Remove Folder', id, 16)}
      css={{
        maxWidth: '800px',
        overflow: 'hidden',
      }}
    >
      <Flex direction="column" gap="2">
        <Paragraph>
          Are you sure you would like to remove the folder? Your host will lose
          XX GB of storage capacity. On large folders or slow disks your host
          may become inaccessible during removal. It is not recommended to
          remove or resize folders when contracts are about to expire.
        </Paragraph>
        <Paragraph>
          Type XXX in the box below to confirm you would like to remove the
          folder.
        </Paragraph>
        <TextField placeholder="XXX" />
        <Switch>Force</Switch>
        <Paragraph>
          Force deleting a folder will remove the folder even if the data can
          not be relocated - this will result in severe data loss and contract
          failure. Be extremely careful using option.
        </Paragraph>
      </Flex>
    </DialogContent>
  )
}
