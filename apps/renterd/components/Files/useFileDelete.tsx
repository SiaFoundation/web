import {
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { Delete16 } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'
import { useCallback } from 'react'
import { useObjectsRemove } from '@siafoundation/renterd-react'
import { getBucketFromPath, getKeyFromPath } from '../../lib/paths'
import { useFilesActiveMode } from '../../contexts/filesManager/useFilesActiveMode'

export function useFileDelete() {
  const { openConfirmDialog } = useDialog()
  const deleteObjects = useObjectsRemove()
  const { multiSelect } = useFilesActiveMode()

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
          const bucket = getBucketFromPath(path)
          const prefix = getKeyFromPath(path)
          const response = await deleteObjects.post({
            payload: {
              bucket,
              prefix,
            },
          })

          if (response.error) {
            triggerErrorToast({
              title: 'Error deleting file',
              body: response.error,
            })
          } else {
            triggerSuccessToast({ title: 'Deleted file' })
            // Deselect the deleted file if it's currently selected.
            if (multiSelect?.selection[path]) {
              multiSelect.deselect([path])
            }
          }
        },
      }),
    [openConfirmDialog, deleteObjects, multiSelect],
  )
}
