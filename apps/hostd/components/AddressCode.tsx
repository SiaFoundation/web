import {
  Flex,
  Heading,
  Text,
  ValueCopyable,
} from '@siafoundation/design-system'
import QRCode from 'react-qr-code'

type Props = {
  title: string
  description?: string
  address: string
}

export function AddressCode({ title, description, address }: Props) {
  return (
    <Flex direction="column" gap="2" align="center" justify="center">
      <Heading size="20" font="mono">
        {title}
      </Heading>
      {description && <Text>{description}</Text>}
      <Flex css={{ p: '$1', background: 'white' }}>
        <QRCode size={200} value={address} />
      </Flex>
      <ValueCopyable type="address" value={address} />
    </Flex>
  )
}
