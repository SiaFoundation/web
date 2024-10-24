import { MultiSelectionMenu } from '@siafoundation/design-system'
import { FilesBatchDelete } from '../../Files/batchActions/FilesBatchDelete'
import { useFilesFlat } from '../../../contexts/filesFlat'

export function FilesFlatBatchMenu() {
  const { multiSelect } = useFilesFlat()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="file">
      <FilesBatchDelete multiSelect={multiSelect} />
    </MultiSelectionMenu>
  )
}
