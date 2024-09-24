import {
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { Delete16 } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'
import { useCallback } from 'react'
import { useObjectsRemove } from '@siafoundation/renterd-react'
import { humanBytes } from '@siafoundation/units'
import { getBucketFromPath, getKeyFromPath } from '../../lib/paths'

export function useDirectoryDelete() {
  const { openConfirmDialog } = useDialog()
  const deleteObjects = useObjectsRemove()

  return useCallback(
    (path: string, size: number) =>
      openConfirmDialog({
        title: 'Delete directory',
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
              Are you sure you would like to delete the following directory
              which contains {humanBytes(size)} of data:
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
              title: 'Error deleting directory',
              body: response.error,
            })
          } else {
            triggerSuccessToast({ title: 'Deleted directory' })
          }
        },
      }),
    [openConfirmDialog, deleteObjects]
  )
}
