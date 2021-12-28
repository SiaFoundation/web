import Link from 'next/link'
import { appName } from '../config/app'
import { Text } from '../system/Text'
import { Flex } from '../system/Flex'

export function Header() {
  return (
    <Flex
      css={{
        position: 'relative',
        flexDirection: 'column',
        marginBottom: '$5',
      }}
    >
      <Link href="/" passHref>
        <Text as="a" size="3" interactive>
          {appName}
        </Text>
      </Link>
      <Text as="span" size="1">
        Decentralized storage for the post-cloud world.
      </Text>
    </Flex>
  )
}
