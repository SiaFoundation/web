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
import { useSettingUpdate } from '@siafoundation/renterd-react'
import { useS3AuthenticationSettings } from '../../hooks/useS3AuthenticationSettings'
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
  const s3AuthenticationSettings = useS3AuthenticationSettings()
  const update = useSettingUpdate()
  const deleteKey = useCallback(async () => {
    const newKeys = omit(s3AuthenticationSettings.data?.v4Keypairs, s3Key)
    const response = await update.put({
      params: {
        key: 's3authentication',
      },
      payload: {
        v4Keypairs: newKeys,
      },
    })
    if (response.error) {
      triggerErrorToast({ title: 'Error deleting key', body: response.error })
    } else {
      triggerSuccessToast({ title: `Key ${s3Key} removed` })
    }
  }, [s3AuthenticationSettings.data, s3Key, update])

  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover" {...buttonProps}>
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
            action: 'Remove',
            variant: 'red',
            body: (
              <div className="flex flex-col gap-1">
                <Paragraph size="14">
                  Are you sure you would like to remove the following key?
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
