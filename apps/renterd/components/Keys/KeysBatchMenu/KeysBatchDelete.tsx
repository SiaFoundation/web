import {
  Button,
  Paragraph,
  triggerSuccessToast,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { Delete16 } from '@siafoundation/react-icons'
import {
  useSettingsS3,
  useSettingsS3Update,
} from '@siafoundation/renterd-react'
import { useCallback, useMemo } from 'react'
import { omit } from '@technically/lodash'
import { useDialog } from '../../../contexts/dialog'
import { useKeys } from '../../../contexts/keys'

export function KeysBatchDelete() {
  const { selectionMap, deselect } = useKeys()

  const ids = useMemo(
    () => Object.entries(selectionMap).map(([_, item]) => item.id),
    [selectionMap]
  )
  const keys = useMemo(
    () => Object.entries(selectionMap).map(([_, item]) => item.key),
    [selectionMap]
  )
  const { openConfirmDialog } = useDialog()
  const settingsS3 = useSettingsS3()
  const settingsS3Update = useSettingsS3Update()
  const deleteKeys = useCallback(async () => {
    if (!settingsS3.data) {
      triggerErrorToast({ title: 'Error deleting key' })
      return
    }
    const newKeys = omit(settingsS3.data?.authentication.v4Keypairs, keys)
    const response = await settingsS3Update.put({
      payload: {
        ...settingsS3.data,
        authentication: {
          ...settingsS3.data.authentication,
          v4Keypairs: newKeys,
        },
      },
    })
    deselect(ids)
    if (response.error) {
      triggerErrorToast({ title: 'Error deleting keys', body: response.error })
    } else {
      triggerSuccessToast({ title: `Keys deleted` })
    }
  }, [settingsS3.data, settingsS3Update, deselect, keys, ids])

  return (
    <Button
      aria-label="delete selected keys"
      tip="Delete selected keys"
      onClick={() => {
        openConfirmDialog({
          title: `Delete keys`,
          action: 'Delete',
          variant: 'red',
          body: (
            <div className="flex flex-col gap-1">
              <Paragraph size="14">
                Are you sure you would like to delete the{' '}
                {ids.length.toLocaleString()} selected keys?
              </Paragraph>
            </div>
          ),
          onConfirm: async () => {
            deleteKeys()
          },
        })
      }}
    >
      <Delete16 />
    </Button>
  )
}
