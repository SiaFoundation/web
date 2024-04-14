import {
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { Delete16 } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'
import { useCallback } from 'react'
import { useObjectDelete } from '@siafoundation/renterd-react'
import { bucketAndKeyParamsFromPath } from '../../lib/paths'

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
            params: bucketAndKeyParamsFromPath(path),
          })

          if (response.error) {
            triggerErrorToast({
              title: 'Error deleting file',
              body: response.error,
            })
          }
          triggerSuccessToast({ title: 'Deleted file' })
        },
      }),
    [openConfirmDialog, deleteObject]
  )
}
