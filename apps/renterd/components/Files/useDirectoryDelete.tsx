import {
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { Delete16 } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'
import { useCallback } from 'react'
import { useObjectDelete } from '@siafoundation/react-renterd'
import { humanBytes } from '@siafoundation/units'
import { bucketAndKeyParamsFromPath } from '../../lib/paths'

export function useDirectoryDelete() {
  const { openConfirmDialog } = useDialog()
  const deleteObject = useObjectDelete()

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
          const response = await deleteObject.delete({
            params: { ...bucketAndKeyParamsFromPath(path), batch: true },
          })

          if (response.error) {
            triggerErrorToast({
              title: 'Error deleting directory',
              body: response.error,
            })
          }
          triggerSuccessToast({ title: 'Deleted directory' })
        },
      }),
    [openConfirmDialog, deleteObject]
  )
}
