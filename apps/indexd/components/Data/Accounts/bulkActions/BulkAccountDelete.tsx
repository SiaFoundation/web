import { Button, handleBatchOperation } from '@siafoundation/design-system'
import { useAdminAccountDelete } from '@siafoundation/indexd-react'
import { useCallback } from 'react'
import { pluralize } from '@siafoundation/units'
import { AccountData } from '../types'
import { useMutate } from '@siafoundation/react-core'
import { adminAccountsRoute } from '@siafoundation/indexd-types'
import { Row } from '@tanstack/react-table'
import { TrashCan16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../../contexts/dialog'

export function BulkAccountDelete({
  accounts,
}: {
  accounts: AccountData[] | Row<AccountData>[]
}) {
  const accountDelete = useAdminAccountDelete()
  const mutate = useMutate()
  const { openConfirmDialog } = useDialog()

  const normalized = accounts.map((account) =>
    'publicKey' in account ? account : (account.original as AccountData)
  )

  const operation = useCallback(async () => {
    await handleBatchOperation(
      normalized.map((account) =>
        accountDelete.delete({
          params: {
            accountkey: account.publicKey,
          },
        })
      ),
      {
        toastError: ({ successCount, errorCount, totalCount }) => ({
          title: `Deleted ${pluralize(successCount, 'account')}`,
          body: `Error deleting ${errorCount}/${totalCount} total accounts.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `Deleted ${pluralize(totalCount, 'account')}`,
        }),
      }
    )
    await mutate((key) => key.startsWith(adminAccountsRoute))
  }, [normalized, accountDelete, mutate])

  return (
    <Button
      onClick={() =>
        openConfirmDialog({
          title:
            normalized.length === 1
              ? 'Delete this account?'
              : `Delete ${pluralize(normalized.length, 'account')}?`,
          action: 'Delete',
          variant: 'red',
          body:
            normalized.length === 1
              ? 'The account and all its data will be permanently deleted.'
              : 'The selected accounts and all their data will be permanently deleted.',
          onConfirm: operation,
        })
      }
      variant="red"
    >
      <TrashCan16 />
      Delete{accounts.length > 1 ? ` (${accounts.length})` : ''}
    </Button>
  )
}
