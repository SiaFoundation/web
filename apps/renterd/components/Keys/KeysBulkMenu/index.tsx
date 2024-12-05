import { MultiSelectionMenu } from '@siafoundation/design-system'
import { useKeys } from '../../../contexts/keys'
import { KeysBulkDelete } from './KeysBulkDelete'

export function KeysBulkMenu() {
  const { multiSelect } = useKeys()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="key">
      <KeysBulkDelete />
    </MultiSelectionMenu>
  )
}
