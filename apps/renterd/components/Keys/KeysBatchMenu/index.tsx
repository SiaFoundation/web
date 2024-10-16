import { MultiSelectionMenu } from '@siafoundation/design-system'
import { useKeys } from '../../../contexts/keys'
import { KeysBatchDelete } from './KeysBatchDelete'

export function KeysBatchMenu() {
  const { selectionCount, isPageAllSelected, pageCount, deselectAll } =
    useKeys()

  return (
    <MultiSelectionMenu
      isVisible={selectionCount > 0}
      selectionCount={selectionCount}
      isPageAllSelected={isPageAllSelected}
      deselectAll={deselectAll}
      pageCount={pageCount}
      entityWord="key"
    >
      <KeysBatchDelete />
    </MultiSelectionMenu>
  )
}
