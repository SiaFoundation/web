import {
  Delete16,
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useCallback } from 'react'
import { useContractDelete } from '@siafoundation/react-renterd'

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
            triggerErrorToast('Error deleting contract.')
          }
          triggerSuccessToast('Successfully deleted contract.')
        },
      }),
    [openConfirmDialog, deleteContract]
  )
}
