import { Button, handleBatchOperation } from '@siafoundation/design-system'
import { useAdminObjectBlocklistRemove } from '@siafoundation/indexd-react'
import { useCallback } from 'react'
import { pluralize } from '@siafoundation/units'
import { Row } from '@tanstack/react-table'
import { Unlocked16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../../contexts/dialog'
import { BlockedObjectData } from '../types'

export function BulkObjectUnblock({
  objects,
  onSuccess,
}: {
  objects: BlockedObjectData[] | Row<BlockedObjectData>[]
  onSuccess?: () => void
}) {
  const objectUnblock = useAdminObjectBlocklistRemove()
  const { openConfirmDialog } = useDialog()

  const normalized = objects.map((object) =>
    'key' in object ? object : (object.original as BlockedObjectData),
  )

  const operation = useCallback(async () => {
    await handleBatchOperation(
      normalized.map((object) =>
        objectUnblock.delete({
          params: {
            objectkey: object.key,
          },
        }),
      ),
      {
        toastError: ({ successCount, errorCount, totalCount }) => ({
          title: `Unblocked ${pluralize(successCount, 'object')}`,
          body: `Error unblocking ${errorCount}/${totalCount} total objects.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `Unblocked ${pluralize(totalCount, 'object')}`,
        }),
      },
    )
    onSuccess?.()
  }, [normalized, objectUnblock, onSuccess])

  return (
    <Button
      onClick={() =>
        openConfirmDialog({
          title:
            normalized.length === 1
              ? 'Unblock this object?'
              : `Unblock ${pluralize(normalized.length, 'object')}?`,
          action: 'Unblock',
          variant: 'accent',
          body:
            normalized.length === 1
              ? 'The object can be fetched, pinned and shared again.'
              : 'The selected objects can be fetched, pinned and shared again.',
          onConfirm: operation,
        })
      }
    >
      <Unlocked16 />
      Unblock{objects.length > 1 ? ` (${objects.length})` : ''}
    </Button>
  )
}
