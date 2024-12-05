import {
  Button,
  handleBatchOperation,
  Paragraph,
} from '@siafoundation/design-system'
import { Delete16 } from '@siafoundation/react-icons'
import { useContractDelete } from '@siafoundation/renterd-react'
import { useCallback, useMemo } from 'react'
import { useDialog } from '../../../contexts/dialog'
import { useContracts } from '../../../contexts/contracts'
import { pluralize } from '@siafoundation/units'

export function ContractsBulkDelete() {
  const { multiSelect } = useContracts()

  const ids = useMemo(
    () => Object.entries(multiSelect.selectionMap).map(([_, item]) => item.id),
    [multiSelect.selectionMap]
  )
  const { openConfirmDialog } = useDialog()
  const deleteContract = useContractDelete()
  const deleteAll = useCallback(async () => {
    await handleBatchOperation(
      ids.map((id) => deleteContract.delete({ params: { id } })),
      {
        toastError: ({ successCount, errorCount, totalCount }) => ({
          title: `${pluralize(successCount, 'contract')} deleted`,
          body: `Error deleting ${errorCount}/${totalCount} total contracts.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `${pluralize(totalCount, 'contract')} deleted`,
        }),
        after: () => {
          multiSelect.deselectAll()
        },
      }
    )
  }, [multiSelect, ids, deleteContract])

  return (
    <Button
      aria-label="delete selected contracts"
      tip="Delete selected contracts"
      onClick={() => {
        openConfirmDialog({
          title: `Delete contracts`,
          action: 'Delete',
          variant: 'red',
          body: (
            <div className="flex flex-col gap-1">
              <Paragraph size="14">
                Are you sure you would like to delete the{' '}
                {pluralize(multiSelect.selectionCount, 'selected contract')}?
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
