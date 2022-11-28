import { Text } from '../core/Text'
import { WalletAddressCode } from './WalletAddressCode'
import { getTitleId } from '../lib/utils'
import { useWalletAddress } from '@siafoundation/react-core'
import { Dialog } from '../core/Dialog'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSingleAddressDetailsDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const address = useWalletAddress()

  return (
    <Dialog
      title={getTitleId('Address', address.data || '', 16)}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
    >
      <div className="flex flex-col gap-4">
        {!address.data && !address.isValidating ? (
          <Text>Could not retreive wallet address</Text>
        ) : (
          <WalletAddressCode address={address.data || ''} />
        )}
      </div>
    </Dialog>
  )
}
