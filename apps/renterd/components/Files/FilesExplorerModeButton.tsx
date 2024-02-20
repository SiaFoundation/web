import { Button, Tooltip } from '@siafoundation/design-system'
import { BucketIcon, Earth16, Folder16 } from '@siafoundation/react-icons'
import { useFilesManager } from '../../contexts/filesManager'

export function FilesExplorerModeButton() {
  const { isViewingBuckets, toggleExplorerMode, activeExplorerMode } =
    useFilesManager()

  if (isViewingBuckets) {
    return (
      <Tooltip content="Viewing all buckets">
        <div>
          <Button state="waiting">
            <BucketIcon size={16} />
          </Button>
        </div>
      </Tooltip>
    )
  }

  return (
    <Button
      onClick={toggleExplorerMode}
      tip={
        activeExplorerMode === 'directory'
          ? 'Viewing directory explorer'
          : 'Viewing all bucket files'
      }
    >
      {activeExplorerMode === 'directory' ? <Folder16 /> : <Earth16 />}
    </Button>
  )
}
