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
import {
  getBucketFromPath,
  getKeyFromPath,
  ensureDirectory,
} from '../../lib/paths'
import { useFilesActiveMode } from '../../contexts/filesManager/useFilesActiveMode'

export function useDirectoryDelete() {
  const { openConfirmDialog } = useDialog()
  const deleteObjects = useObjectsRemove()
  const { multiSelect } = useFilesActiveMode()

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
            // Deselect the deleted directory and all files within it.
            if (multiSelect) {
              // Ensure path ends with / for proper matching to avoid matching sibling directories.
              // e.g., without this, 'bucket/dir' would match 'bucket/dir2/file.txt'
              const normalizedPath = ensureDirectory(path)
              const idsToDeselect = Object.keys(multiSelect.selection).filter(
                (id) => id === path || id.startsWith(normalizedPath),
              )
              if (idsToDeselect.length > 0) {
                multiSelect.deselect(idsToDeselect)
              }
            }
          }
        },
      }),
    [openConfirmDialog, deleteObjects, multiSelect],
  )
}
