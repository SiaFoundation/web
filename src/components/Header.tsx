import Link from 'next/link'
import { appName } from '../config/app'
import { Text } from '../system/Text'
import { Flex } from '../system/Flex'
import { apiDomain } from '../config/env'
import { sitemap, social } from '../config/site'
import { Li } from '../system/Li'
import { Box } from '../system/Box'

export function Header() {
  return (
    <Flex
      css={{
        position: 'relative',
        alignItems: 'center',
      }}
    >
      <Flex
        column
        css={{
          position: 'relative',
        }}
      >
        <Link href={sitemap.home.index} passHref>
          <Text as="a" size="3" interactive>
            {appName}
          </Text>
        </Link>
        <Text as="span" size="1">
          Decentralized storage for the post-cloud world.
        </Text>
      </Flex>
      <Box css={{ flex: 1 }} />
      <Flex
        column
        css={{
          gap: '$1',
        }}
      >
        <Flex
          as="ul"
          css={{
            gap: '$3',
            margin: '$1 0',
            justifyContent: 'end',
          }}
        >
          <Li>
            <Link href={sitemap.developers.index}>Developers</Link>
          </Li>
          <Li>
            <Link href={sitemap.learn.index}>Learn</Link>
          </Li>
          <Li>
            <Link href={sitemap.community.index}>Community & Ecosystem</Link>
          </Li>
        </Flex>
        <Flex
          as="ul"
          css={{
            gap: '$3',
            margin: '$1 0',
            justifyContent: 'end',
          }}
        >
          <Li>
            <Link href={`https://${apiDomain}`} passHref>
              <a target="_blank">API Reference</a>
            </Link>
          </Li>
          <Li>
            <Link href={social.docs} passHref>
              <a target="_blank">Documentation</a>
            </Link>
          </Li>
          <Li>
            <Link href={social.blog} passHref>
              <a target="_blank">Blog</a>
            </Link>
          </Li>
          <Li>
            <Link href={sitemap.foundation.index}>About Sia Foundation</Link>
          </Li>
        </Flex>
      </Flex>
    </Flex>
  )
}
