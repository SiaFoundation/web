import { Flex, Heading, Text } from '../core'
import { ValueCopyable } from '../components'
import QRCode from 'react-qr-code'

type Props = {
  title?: string
  description?: string
  address: string
}

export function WalletAddressCode({ title, description, address }: Props) {
  return (
    <Flex direction="column" gap="2" align="center" justify="center">
      {title && (
        <Heading size="20" font="mono">
          {title}
        </Heading>
      )}
      {description && <Text>{description}</Text>}
      <Flex
        css={{
          position: 'relative',
          p: '5px',
          background: 'white',
          height: '210px',
          width: '210px',
        }}
      >
        <Flex css={{ position: 'absolute' }}>
          <QRCode size={200} value={address} />
        </Flex>
      </Flex>
      <ValueCopyable type="address" value={address} />
    </Flex>
  )
}
