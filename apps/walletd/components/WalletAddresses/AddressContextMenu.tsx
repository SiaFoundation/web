import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
  stripPrefix,
} from '@siafoundation/design-system'
import { Delete16 } from '@siafoundation/react-icons'
import { useWalletAddressDelete } from '@siafoundation/react-walletd'
import { AddressData } from '../../contexts/addresses/types'
import { useDialog } from '../../contexts/dialog'

type Props = {
  address: AddressData
} & Omit<React.ComponentProps<typeof DropdownMenu>, 'children'>

export function AddressContextMenu({
  address: { walletId, id, index },
  ...props
}: Props) {
  const { openDialog } = useDialog()
  const addressDelete = useWalletAddressDelete()
  return (
    <DropdownMenu {...props}>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onClick={(e) => e.stopPropagation()}
        onSelect={() =>
          openDialog('confirm', {
            title:
              index !== undefined
                ? `Remove address ${index}`
                : 'Remove address',
            action: 'Remove',
            variant: 'red',
            body: (
              <div className="flex flex-col gap-1">
                <Paragraph size="14">
                  Are you sure you would like to remove the following address?
                </Paragraph>
                <Paragraph size="14" font="mono">
                  {stripPrefix(id).slice(0, 40)}...
                </Paragraph>
              </div>
            ),
            onConfirm: async () => {
              const response = await addressDelete.delete({
                params: {
                  id: walletId,
                  addr: id,
                },
              })
              if (response.error) {
                triggerErrorToast(`Failed to delete address: ${response.error}`)
              } else {
                triggerSuccessToast(
                  index !== undefined
                    ? `Address ${index} removed.`
                    : 'Address removed.'
                )
              }
            },
          })
        }
      >
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Remove address
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
