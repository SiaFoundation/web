import { Button, Tooltip } from '@siafoundation/design-system'
import { BucketIcon } from '@siafoundation/react-icons'
import { useFilesManager } from '../../contexts/filesManager'
import { FilesExplorerModeContextMenu } from './FilesExplorerModeContextMenu'

export function FilesExplorerModeButton() {
  const { isViewingBuckets } = useFilesManager()

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

  return <FilesExplorerModeContextMenu />
}
