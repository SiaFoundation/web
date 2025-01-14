import { Button } from '@siafoundation/design-system'
import { Search16 } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'
import { FilesViewDropdownMenu } from '../Files/FilesViewDropdownMenu'
import { useFilesFlat } from '../../contexts/filesFlat'

export function FilesActionsMenu() {
  const { openDialog } = useDialog()
  const { tableState } = useFilesFlat()
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => openDialog('filesSearch')}
        tip="Search files"
        aria-label="search files"
      >
        <Search16 />
      </Button>
      <FilesViewDropdownMenu tableState={tableState} />
    </div>
  )
}
