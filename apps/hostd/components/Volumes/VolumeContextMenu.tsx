import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
  triggerErrorToast,
  triggerSuccessToast,
  Text,
  truncate,
} from '@siafoundation/design-system'
import {
  Draggable16,
  Ruler16,
  Delete16,
  Locked16,
  Edit16,
  Close16,
} from '@siafoundation/react-icons'
import {
  VolumeStatus,
  useVolume,
  useVolumeCancel,
  useVolumeUpdate,
} from '@siafoundation/react-hostd'
import { useDialog } from '../../contexts/dialog'

type Props = {
  id: string
  contentProps?: React.ComponentProps<typeof DropdownMenu>['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
}

export function VolumeContextMenu({ id, contentProps, buttonProps }: Props) {
  const { openDialog } = useDialog()
  const volumeUpdate = useVolumeUpdate()
  const volume = useVolume({
    params: {
      id,
    },
  })
  const volumeCancel = useVolumeCancel()
  const isReady = volume.data && volume.data.status == 'ready'
  const isOperationInProgress =
    volume.data && !['ready', 'unavailable'].includes(volume.data.status)
  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover" {...buttonProps}>
          <Draggable16 />
        </Button>
      }
      contentProps={{ align: 'start', ...contentProps }}
    >
      <div className="px-1.5 py-1">
        <Text size="14" weight="medium" color="subtle">
          Volume {volume.data ? truncate(volume.data?.localPath, 24) : id}
        </Text>
      </div>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      {isOperationInProgress ? (
        <DropdownMenuItem
          onSelect={async () => {
            const status = volume.data?.status
            const response = await volumeCancel.delete({
              params: {
                id: Number(id),
              },
            })
            if (response.error) {
              triggerErrorToast(
                `Error canceling volume ${getActiveOperationLabel(status)}.`
              )
            } else {
              triggerSuccessToast(
                `Successfully canceled volume ${getActiveOperationLabel(
                  status
                )}.`
              )
            }
          }}
        >
          <DropdownMenuLeftSlot>
            <Close16 />
          </DropdownMenuLeftSlot>
          {`Cancel ${getActiveOperationLabel(volume.data?.status)}`}
        </DropdownMenuItem>
      ) : null}
      {volume.data ? (
        <DropdownMenuItem
          disabled={!isReady}
          onSelect={async () => {
            const nextReadOnly = !volume.data.readOnly
            const response = await volumeUpdate.put({
              params: {
                id: Number(id),
              },
              payload: {
                readOnly: nextReadOnly,
              },
            })
            if (response.error) {
              triggerErrorToast(
                nextReadOnly
                  ? 'Error setting volume to read-only.'
                  : 'Error setting volume to read/write.'
              )
            } else {
              triggerSuccessToast(
                nextReadOnly
                  ? 'Volume set to read-only.'
                  : 'Volume set to read/write.'
              )
            }
          }}
        >
          <DropdownMenuLeftSlot>
            {volume.data.readOnly ? <Edit16 /> : <Locked16 />}
          </DropdownMenuLeftSlot>
          {volume.data.readOnly ? 'Set to read/write' : 'Set to read-only'}
        </DropdownMenuItem>
      ) : null}
      <DropdownMenuItem
        disabled={!isReady}
        onSelect={() => openDialog('volumeResize', id)}
      >
        <DropdownMenuLeftSlot>
          <Ruler16 />
        </DropdownMenuLeftSlot>
        Resize
      </DropdownMenuItem>
      <DropdownMenuItem
        disabled={isOperationInProgress}
        onSelect={() => openDialog('volumeDelete', id)}
      >
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Delete
      </DropdownMenuItem>
    </DropdownMenu>
  )
}

function getActiveOperationLabel(status: VolumeStatus) {
  if (status === 'resizing') {
    return 'resize'
  }
  if (status === 'creating') {
    return 'creation'
  }
  if (status === 'removing') {
    return 'removal'
  }
  return 'operation'
}
