import { Button, handleBatchOperation } from '@siafoundation/design-system'
import { useAdminQuotaDelete } from '@siafoundation/indexd-react'
import { useCallback } from 'react'
import { pluralize } from '@siafoundation/units'
import { QuotaData } from '../../../../lib/quota'
import { useMutate } from '@siafoundation/react-core'
import { adminQuotasRoute } from '@siafoundation/indexd-types'
import { Row } from '@tanstack/react-table'
import { TrashCan16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../../contexts/dialog'

export function BulkQuotaDelete({
  quotas,
}: {
  quotas: QuotaData[] | Row<QuotaData>[]
}) {
  const quotaDelete = useAdminQuotaDelete()
  const mutate = useMutate()
  const { openConfirmDialog } = useDialog()

  const normalized = quotas.map((quota) =>
    'key' in quota ? quota : (quota.original as QuotaData)
  )

  const operation = useCallback(async () => {
    await handleBatchOperation(
      normalized.map((quota) =>
        quotaDelete.delete({
          params: {
            key: quota.key,
          },
        })
      ),
      {
        toastError: ({ successCount, errorCount, totalCount }) => ({
          title: `Deleted ${pluralize(successCount, 'quota')}`,
          body: `Error deleting ${errorCount}/${totalCount} total quotas.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `Deleted ${pluralize(totalCount, 'quota')}`,
        }),
      }
    )
    await mutate((key) => key.startsWith(adminQuotasRoute))
  }, [normalized, quotaDelete, mutate])

  return (
    <Button
      onClick={() =>
        openConfirmDialog({
          title:
            normalized.length === 1
              ? 'Delete this quota?'
              : `Delete ${pluralize(normalized.length, 'quota')}?`,
          action: 'Delete',
          variant: 'red',
          body:
            normalized.length === 1
              ? 'The quota will be permanently deleted.'
              : 'The selected quotas will be permanently deleted.',
          onConfirm: operation,
        })
      }
      variant="red"
    >
      <TrashCan16 />
      Delete{quotas.length > 1 ? ` (${quotas.length})` : ''}
    </Button>
  )
}
