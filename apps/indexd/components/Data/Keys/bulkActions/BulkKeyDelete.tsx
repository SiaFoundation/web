import { Button, handleBatchOperation } from '@siafoundation/design-system'
import { useAdminConnectKeyDelete } from '@siafoundation/indexd-react'
import { useCallback } from 'react'
import { pluralize } from '@siafoundation/units'
import { KeyData } from '../../../../lib/connectKey'
import { useMutate } from '@siafoundation/react-core'
import { adminConnectKeysRoute } from '@siafoundation/indexd-types'
import { Row } from '@tanstack/react-table'
import { TrashCan16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../../contexts/dialog'

export function BulkKeyDelete({
  keys,
}: {
  keys: KeyData[] | Row<KeyData>[]
}) {
  const keyDelete = useAdminConnectKeyDelete()
  const mutate = useMutate()
  const { openConfirmDialog } = useDialog()

  const normalized = keys.map((key) =>
    'key' in key ? key : (key.original as KeyData)
  )

  const operation = useCallback(async () => {
    await handleBatchOperation(
      normalized.map((key) =>
        keyDelete.delete({
          params: {
            key: key.key,
          },
        })
      ),
      {
        toastError: ({ successCount, errorCount, totalCount }) => ({
          title: `Deleted ${pluralize(successCount, 'key')}`,
          body: `Error deleting ${errorCount}/${totalCount} total keys.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `Deleted ${pluralize(totalCount, 'key')}`,
        }),
      }
    )
    await mutate((key) => key.startsWith(adminConnectKeysRoute))
  }, [normalized, keyDelete, mutate])

  return (
    <Button
      onClick={() =>
        openConfirmDialog({
          title:
            normalized.length === 1
              ? 'Delete this key?'
              : `Delete ${pluralize(normalized.length, 'key')}?`,
          action: 'Delete',
          variant: 'red',
          body:
            normalized.length === 1
              ? 'The key will be permanently deleted.'
              : 'The selected keys will be permanently deleted.',
          onConfirm: operation,
        })
      }
      variant="red"
    >
      <TrashCan16 />
      Delete{keys.length > 1 ? ` (${keys.length})` : ''}
    </Button>
  )
}
