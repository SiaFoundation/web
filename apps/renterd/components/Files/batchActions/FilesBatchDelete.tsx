import {
  Button,
  Paragraph,
  triggerSuccessToast,
  triggerErrorToast,
  MultiSelect,
} from '@siafoundation/design-system'
import { Delete16 } from '@siafoundation/react-icons'
import { useCallback, useMemo } from 'react'
import { useDialog } from '../../../contexts/dialog'
import { useObjectsRemove } from '@siafoundation/renterd-react'
import { ObjectData } from '../../../contexts/filesManager/types'

export function FilesBatchDelete({
  multiSelect,
}: {
  multiSelect: MultiSelect<ObjectData>
}) {
  const filesToDelete = useMemo(
    () =>
      Object.entries(multiSelect.selectionMap).map(([_, item]) => ({
        bucket: item.bucket.name,
        prefix: item.key,
      })),
    [multiSelect.selectionMap]
  )
  const { openConfirmDialog } = useDialog()
  const objectsRemove = useObjectsRemove()
  const deleteFiles = useCallback(async () => {
    const totalCount = filesToDelete.length
    let errorCount = 0
    for (const { bucket, prefix } of filesToDelete) {
      const response = await objectsRemove.post({
        payload: {
          bucket,
          prefix,
        },
      })
      if (response.error) {
        errorCount++
      }
    }
    if (errorCount > 0) {
      triggerErrorToast({
        title: `${totalCount - errorCount} files deleted`,
        body: `Error deleting ${errorCount}/${totalCount} total files.`,
      })
    } else {
      triggerSuccessToast({ title: `${totalCount} files deleted` })
    }
    multiSelect.deselectAll()
  }, [multiSelect, filesToDelete, objectsRemove])

  return (
    <Button
      aria-label="delete selected files"
      tip="Delete selected files"
      onClick={() => {
        openConfirmDialog({
          title: `Delete files`,
          action: 'Delete',
          variant: 'red',
          body: (
            <div className="flex flex-col gap-1">
              <Paragraph size="14">
                Are you sure you would like to delete the{' '}
                {multiSelect.selectionCount.toLocaleString()} selected files?
              </Paragraph>
            </div>
          ),
          onConfirm: async () => {
            deleteFiles()
          },
        })
      }}
    >
      <Delete16 />
    </Button>
  )
}
