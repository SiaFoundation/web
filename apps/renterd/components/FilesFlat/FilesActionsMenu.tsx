import { Button } from '@siafoundation/design-system'
import { Search16 } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'
import { FilesViewDropdownMenu } from '../Files/FilesViewDropdownMenu'

export function FilesActionsMenu() {
  const { openDialog } = useDialog()

  return (
    <div className="flex gap-2">
      <Button onClick={() => openDialog('filesSearch')} tip="Search files">
        <Search16 />
      </Button>
      <FilesViewDropdownMenu />
    </div>
  )
}
