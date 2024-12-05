import { MultiSelectionMenu } from '@siafoundation/design-system'
import { FilesBulkDelete } from '../../Files/bulkActions/FilesBulkDelete'
import { useFilesDirectory } from '../../../contexts/filesDirectory'
import { FilesBulkMove } from './FilesBulkMove'

export function FilesDirectoryBulkMenu() {
  const { multiSelect } = useFilesDirectory()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="file">
      <FilesBulkMove />
      <FilesBulkDelete multiSelect={multiSelect} />
    </MultiSelectionMenu>
  )
}
