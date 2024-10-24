import { MultiSelectionMenu } from '@siafoundation/design-system'
import { useKeys } from '../../../contexts/keys'
import { KeysBatchDelete } from './KeysBatchDelete'

export function KeysBatchMenu() {
  const { multiSelect } = useKeys()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="key">
      <KeysBatchDelete />
    </MultiSelectionMenu>
  )
}
