import { Flex, Heading, Text } from '../core'
import { ValueCopyable } from '../components'
import QRCode from 'react-qr-code'

type Props = {
  title: string
  description?: string
  address: string
}

export function WalletAddressCode({ title, description, address }: Props) {
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
