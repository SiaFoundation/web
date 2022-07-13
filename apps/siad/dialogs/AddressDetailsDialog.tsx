import {
  Flex,
  DialogContent,
  getTitleId,
  Text,
} from '@siafoundation/design-system'
import { useWalletAddress } from '@siafoundation/react-siad'
import { AddressCode } from '../components/AddressCode'
import { useDialog } from '../contexts/dialog'

export function AddressDetailsDialog() {
  const { id } = useDialog()

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
        <AddressCode
          title={`Index ${address.data.index}`}
          description={address.data.description}
          address={id}
        />
      </Flex>
    </DialogContent>
  )
}
