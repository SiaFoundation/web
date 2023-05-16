import {
  Delete16,
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useCallback } from 'react'
import { useObjectDelete } from '@siafoundation/react-renterd'

export function useFileDelete() {
  const { openConfirmDialog } = useDialog()
  const deleteObject = useObjectDelete()

  return useCallback(
    (path: string) =>
      openConfirmDialog({
        title: 'Delete file',
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
              Are you sure you would like to delete the following file:
            </Paragraph>
            <Paragraph size="14" font="mono" className="break-words">
              {path}
            </Paragraph>
          </div>
        ),
        onConfirm: async () => {
          const response = await deleteObject.delete({
            params: { key: path.slice(1) },
          })

          if (response.error) {
            triggerErrorToast('Error deleting file.')
          }
          triggerSuccessToast('Successfully deleted file.')
        },
      }),
    [openConfirmDialog, deleteObject]
  )
}
