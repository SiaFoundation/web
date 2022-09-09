import { Flex, DialogContent, Text } from '../core'
import { WalletAddressCode } from './WalletAddressCode'
import { getTitleId } from '../lib/utils'
import { useWalletAddress } from '@siafoundation/react-core'

type Props = {
  id: string
}

export function AddressDetailsDialog({ id }: Props) {
  const address = useWalletAddress(id)

  if (!address.data) {
    return (
      <DialogContent
        title={getTitleId('Address', id, 6)}
        css={{
          maxWidth: '800px',
          overflow: 'hidden',
        }}
      >
        {!address.isValidating && <Text>Could not find address in wallet</Text>}
      </DialogContent>
    )
  }

  return (
    <DialogContent
      title={getTitleId('Address', id, 16)}
      css={{
        maxWidth: '800px',
        overflow: 'hidden',
      }}
    >
      <Flex direction="column" gap="2">
        <WalletAddressCode
          title={`Index ${address.data.index}`}
          description={address.data.description}
          address={id}
        />
      </Flex>
    </DialogContent>
  )
}
