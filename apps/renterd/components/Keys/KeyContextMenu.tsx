import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
  Text,
  Paragraph,
  triggerSuccessToast,
  triggerErrorToast,
  truncate,
} from '@siafoundation/design-system'
import { CaretDown16, Delete16 } from '@siafoundation/react-icons'
import {
  useSettingsS3,
  useSettingsS3Update,
} from '@siafoundation/renterd-react'
import { useCallback } from 'react'
import { omit } from '@technically/lodash'
import { useDialog } from '../../contexts/dialog'

type Props = {
  s3Key: string
  contentProps?: React.ComponentProps<typeof DropdownMenu>['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
}

export function KeyContextMenu({ s3Key, contentProps, buttonProps }: Props) {
  const { openConfirmDialog } = useDialog()
  const settingsS3 = useSettingsS3()
  const settingsS3Update = useSettingsS3Update()
  const deleteKey = useCallback(async () => {
    if (!settingsS3.data) {
      triggerErrorToast({ title: 'Error deleting key' })
      return
    }
    const newKeys = omit(settingsS3.data?.authentication.v4Keypairs, s3Key)
    const response = await settingsS3Update.put({
      payload: {
        ...settingsS3.data,
        authentication: {
          ...settingsS3.data.authentication,
          v4Keypairs: newKeys,
        },
      },
    })
    if (response.error) {
      triggerErrorToast({ title: 'Error deleting key', body: response.error })
    } else {
      triggerSuccessToast({ title: `Key ${s3Key} deleted` })
    }
  }, [settingsS3.data, s3Key, settingsS3Update])

  return (
    <DropdownMenu
      trigger={
        <Button
          aria-label="key context menu"
          icon="hover"
          size="none"
          {...buttonProps}
        >
          <CaretDown16 />
        </Button>
      }
      contentProps={{
        align: 'start',
        ...contentProps,
        onClick: (e) => {
          e.stopPropagation()
        },
      }}
    >
      <div className="px-1.5 py-1">
        <Text size="14" weight="medium" color="subtle">
          Key {s3Key.slice(0, 24)}...
        </Text>
      </div>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => {
          openConfirmDialog({
            title: `Delete key ${truncate(s3Key, 15)}`,
            action: 'Delete',
            variant: 'red',
            body: (
              <div className="flex flex-col gap-1">
                <Paragraph size="14">
                  Are you sure you would like to delete the following key?
                </Paragraph>
                <Paragraph size="14" font="mono">
                  {truncate(s3Key, 80)}
                </Paragraph>
              </div>
            ),
            onConfirm: async () => {
              deleteKey()
            },
          })
        }}
      >
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Delete key
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
