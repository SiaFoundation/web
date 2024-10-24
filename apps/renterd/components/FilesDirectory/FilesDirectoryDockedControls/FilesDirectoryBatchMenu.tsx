import { MultiSelectionMenu } from '@siafoundation/design-system'
import { FilesBatchDelete } from '../../Files/batchActions/FilesBatchDelete'
import { useFilesDirectory } from '../../../contexts/filesDirectory'

export function FilesDirectoryBatchMenu() {
  const { multiSelect } = useFilesDirectory()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="file">
      <FilesBatchDelete multiSelect={multiSelect} />
    </MultiSelectionMenu>
  )
}
