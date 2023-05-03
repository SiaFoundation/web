import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  Draggable16,
  Ruler16,
  Delete16,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
  Locked16,
  Edit16,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useVolume, useVolumeUpdate } from '@siafoundation/react-hostd'
import { useDialog } from '../../contexts/dialog'

type Props = {
  id: string
}

export function VolumeDropdownMenu({ id }: Props) {
  const { openDialog } = useDialog()
  const volumeUpdate = useVolumeUpdate()
  const volume = useVolume({
    params: {
      id,
    },
  })
  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover">
          <Draggable16 />
        </Button>
      }
      contentProps={{ align: 'start' }}
    >
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      {volume.data ? (
        <DropdownMenuItem
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
      <DropdownMenuItem onSelect={() => openDialog('volumeResize', id)}>
        <DropdownMenuLeftSlot>
          <Ruler16 />
        </DropdownMenuLeftSlot>
        Resize
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => openDialog('volumeDelete', id)}>
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Delete
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
