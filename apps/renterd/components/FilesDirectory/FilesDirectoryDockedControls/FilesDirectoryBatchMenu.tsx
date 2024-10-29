import { MultiSelectionMenu } from '@siafoundation/design-system'
import { FilesBatchDelete } from '../../Files/batchActions/FilesBatchDelete'
import { useFilesDirectory } from '../../../contexts/filesDirectory'
import { FilesBatchMove } from './FilesBatchMove'

export function FilesDirectoryBatchMenu() {
  const { multiSelect } = useFilesDirectory()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="file">
      <FilesBatchMove />
      <FilesBatchDelete multiSelect={multiSelect} />
    </MultiSelectionMenu>
  )
}
