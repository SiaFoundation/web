import { Button, Paragraph } from '@siafoundation/design-system'
import { FolderMoveTo16 } from '@siafoundation/react-icons'
import { useFilesDirectory } from '../../../contexts/filesDirectory'
import { useDialog } from '../../../contexts/dialog'

export function FilesBulkMove() {
  const { openConfirmDialog } = useDialog()
  const { multiSelect, moveSelectedFiles, moveSelectedFilesOperationCount } =
    useFilesDirectory()

  return (
    <Button
      disabled={moveSelectedFilesOperationCount === 0}
      aria-label="move selected files to the current directory"
      tip="Move selected files to the current directory"
      onClick={() => {
        openConfirmDialog({
          title: `Move files`,
          action: 'Move',
          variant: 'accent',
          body: (
            <div className="flex flex-col gap-1">
              <Paragraph size="14">
                Are you sure you would like to move the{' '}
                {multiSelect.selectionCount.toLocaleString()} selected files to
                the current directory?
              </Paragraph>
            </div>
          ),
          onConfirm: async () => {
            moveSelectedFiles()
          },
        })
      }}
    >
      <FolderMoveTo16 />
    </Button>
  )
}
