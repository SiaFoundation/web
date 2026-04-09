import { Button, handleBatchOperation } from '@siafoundation/design-system'
import { useAdminContractDelete } from '@siafoundation/indexd-react'
import { useCallback } from 'react'
import { pluralize } from '@siafoundation/units'
import { ContractData } from '../types'
import { useMutate } from '@siafoundation/react-core'
import {
  adminContractRoute,
  adminContractsRoute,
} from '@siafoundation/indexd-types'
import { Row } from '@tanstack/react-table'
import { TrashCan16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../../contexts/dialog'

export function BulkContractDelete({
  contracts,
}: {
  contracts: ContractData[] | Row<ContractData>[]
}) {
  const contractDelete = useAdminContractDelete()
  const mutate = useMutate()
  const { openConfirmDialog } = useDialog()

  const normalized = contracts.map((contract) =>
    'id' in contract && 'displayFields' in contract
      ? contract
      : (contract.original as ContractData)
  )

  const operation = useCallback(async () => {
    await handleBatchOperation(
      normalized.map((contract) =>
        contractDelete.delete({
          params: {
            contractid: contract.id,
          },
        })
      ),
      {
        toastError: ({ successCount, errorCount, totalCount }) => ({
          title: `Deleted ${pluralize(successCount, 'contract')}`,
          body: `Error deleting ${errorCount}/${totalCount} total contracts.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `Deleted ${pluralize(totalCount, 'contract')}`,
        }),
      }
    )
    await mutate((key) => key.startsWith(adminContractsRoute))
    await mutate((key) =>
      key.startsWith(adminContractRoute.replace(':contractid', ''))
    )
  }, [normalized, contractDelete, mutate])

  return (
    <Button
      onClick={() =>
        openConfirmDialog({
          title:
            normalized.length === 1
              ? 'Delete this contract?'
              : `Delete ${pluralize(normalized.length, 'contract')}?`,
          action: 'Delete',
          variant: 'red',
          body:
            normalized.length === 1
              ? 'Sectors pinned to this contract will be unpinned and the contract will be marked as bad.'
              : 'Sectors pinned to the selected contracts will be unpinned and the contracts will be marked as bad.',
          onConfirm: operation,
        })
      }
      variant="red"
    >
      <TrashCan16 />
      Delete{contracts.length > 1 ? ` (${contracts.length})` : ''}
    </Button>
  )
}
