import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLeftSlot,
} from '@siafoundation/design-system'
import { CloudUpload16, Earth16, Folder16 } from '@siafoundation/react-icons'
import { useFilesManager } from '../../contexts/filesManager'

export function FilesExplorerModeContextMenu() {
  const {
    activeExplorerMode,
    setExplorerModeDirectory,
    setExplorerModeFlat,
    isViewingUploads,
    navigateToUploads,
  } = useFilesManager()

  return (
    <DropdownMenu
      trigger={
        <Button
          tipSide="bottom"
          tip={
            isViewingUploads
              ? 'Viewing uploads'
              : activeExplorerMode === 'directory'
                ? 'Viewing directory explorer'
                : 'Viewing all bucket files'
          }
        >
          {isViewingUploads ? (
            <CloudUpload16 />
          ) : activeExplorerMode === 'directory' ? (
            <Folder16 />
          ) : (
            <Earth16 />
          )}
        </Button>
      }
      contentProps={{
        align: 'start',
        side: 'bottom',
        className: 'max-w-[300px]',
      }}
    >
      <DropdownMenuItem onSelect={setExplorerModeDirectory}>
        <DropdownMenuLeftSlot>
          <Folder16 />
        </DropdownMenuLeftSlot>
        Directory
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={setExplorerModeFlat}>
        <DropdownMenuLeftSlot>
          <Earth16 />
        </DropdownMenuLeftSlot>
        All files
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={navigateToUploads}>
        <DropdownMenuLeftSlot>
          <CloudUpload16 />
        </DropdownMenuLeftSlot>
        Uploads
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
