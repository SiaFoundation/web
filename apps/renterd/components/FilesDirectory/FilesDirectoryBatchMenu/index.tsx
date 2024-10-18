import { MultiSelectionMenu } from '@siafoundation/design-system'
import { FilesDirectoryBatchDelete } from './FilesDirectoryBatchDelete'
import { useFilesDirectory } from '../../../contexts/filesDirectory'

export function FilesDirectoryBatchMenu() {
  const { multiSelect } = useFilesDirectory()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="file">
      <FilesDirectoryBatchDelete />
    </MultiSelectionMenu>
  )
}
