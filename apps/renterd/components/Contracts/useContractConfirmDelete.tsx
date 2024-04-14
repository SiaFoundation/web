import {
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { Delete16 } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'
import { useCallback } from 'react'
import { useContractDelete } from '@siafoundation/renterd-react'

export function useContractConfirmDelete() {
  const { openConfirmDialog } = useDialog()
  const deleteContract = useContractDelete()

  return useCallback(
    (id: string) =>
      openConfirmDialog({
        title: 'Delete contract',
        action: (
          <>
            <Delete16 />
            Delete
          </>
        ),
        variant: 'red',
        body: (
          <div className="flex flex-col">
            <Paragraph size="14">
              Are you sure you would like to delete the following contract:
            </Paragraph>
            <Paragraph size="14" font="mono">
              {id.slice(0, 20)}...
            </Paragraph>
          </div>
        ),
        onConfirm: async () => {
          const response = await deleteContract.delete({
            params: { id },
          })

          if (response.error) {
            triggerErrorToast({
              title: 'Error deleting contract',
              body: response.error,
            })
          }
          triggerSuccessToast({ title: 'Deleted contract' })
        },
      }),
    [openConfirmDialog, deleteContract]
  )
}
