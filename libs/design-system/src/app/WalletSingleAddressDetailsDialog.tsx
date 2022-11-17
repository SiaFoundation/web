import { Text } from '../core/Text'
import { WalletAddressCode } from './WalletAddressCode'
import { getTitleId } from '../lib/utils'
import { useWalletAddress } from '@siafoundation/react-core'

export function WalletSingleAddressDetailsDialog() {
  const address = useWalletAddress()

  if (!address.data) {
    return {
      props: {
        title: 'Address',
        className: 'max-w-[800px]',
      },
      el: !address.isValidating && (
        <Text>Could not retreive wallet address</Text>
      ),
    }
  }

  return {
    props: {
      title: getTitleId('Address', address.data, 16),
    },
    el: (
      <div className="flex flex-col gap-4">
        <WalletAddressCode address={address.data} />
      </div>
    ),
  }
}
