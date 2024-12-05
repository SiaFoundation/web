import {
  Button,
  Paragraph,
  MultiSelect,
  handleBatchOperation,
} from '@siafoundation/design-system'
import { Delete16 } from '@siafoundation/react-icons'
import { useCallback, useMemo } from 'react'
import { useDialog } from '../../../contexts/dialog'
import { useObjectsRemove } from '@siafoundation/renterd-react'
import { ObjectData } from '../../../contexts/filesManager/types'
import { pluralize } from '@siafoundation/units'

export function FilesBulkDelete({
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
  const deleteAll = useCallback(async () => {
    await handleBatchOperation(
      filesToDelete.map(({ bucket, prefix }) =>
        objectsRemove.post({
          payload: {
            bucket,
            prefix,
          },
        })
      ),
      {
        toastError: ({ totalCount, errorCount, successCount }) => ({
          title: `${pluralize(successCount, 'file')} deleted`,
          body: `Error deleting ${errorCount}/${totalCount} total files.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `${pluralize(totalCount, 'file')} deleted`,
        }),
        after: () => {
          multiSelect.deselectAll()
        },
      }
    )
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
                {pluralize(multiSelect.selectionCount, 'selected file')}?
              </Paragraph>
            </div>
          ),
          onConfirm: async () => {
            deleteAll()
          },
        })
      }}
    >
      <Delete16 />
    </Button>
  )
}
