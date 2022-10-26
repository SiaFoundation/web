import { Flex } from '../core/Flex'
import { DialogContent } from '../core/Dialog'
import { Text } from '../core/Text'
import { WalletAddressCode } from './WalletAddressCode'
import { getTitleId } from '../lib/utils'
import { useWalletAddress } from '@siafoundation/react-core'

export function WalletSingleAddressDetailsDialog() {
  const address = useWalletAddress()

  if (!address.data) {
    return (
      <DialogContent
        title="Address"
        css={{
          maxWidth: '800px',
          overflow: 'hidden',
        }}
      >
        {!address.isValidating && (
          <Text>Could not retreive wallet address</Text>
        )}
      </DialogContent>
    )
  }

  return (
    <DialogContent
      title={getTitleId('Address', address.data, 16)}
      // css={{
      //   maxWidth: '600px',
      //   minHeight: '300px',
      //   overflow: 'hidden',
      // }}
    >
      <Flex direction="column" gap="2">
        <WalletAddressCode address={address.data} />
      </Flex>
    </DialogContent>
  )
}
