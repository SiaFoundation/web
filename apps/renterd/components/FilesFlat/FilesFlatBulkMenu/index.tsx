import { MultiSelectionMenu } from '@siafoundation/design-system'
import { FilesBulkDelete } from '../../Files/bulkActions/FilesBulkDelete'
import { useFilesFlat } from '../../../contexts/filesFlat'

export function FilesFlatBulkMenu() {
  const { multiSelect } = useFilesFlat()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="file">
      <FilesBulkDelete multiSelect={multiSelect} />
    </MultiSelectionMenu>
  )
}
