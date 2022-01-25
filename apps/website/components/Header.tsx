import { Flex, Heading, Link, Text } from '@siafoundation/design-system'
import { getHosts } from '@siafoundation/env'
import { appName } from '../config/app'
import { sitemap, external } from '../config/site'
import { getHref } from '../lib/url'

export function Header() {
  return (
    <Flex align="center" justify="between">
      <Flex direction="column">
        <Link href={sitemap.home.index}>
          <Heading size="3">{appName}</Heading>
        </Link>
        <Text size="1">Decentralized storage for the post-cloud world.</Text>
      </Flex>
      <Flex direction="column" gap="1">
        <Flex
          gap="3"
          justify="end"
          css={{
            margin: '$1 0',
          }}
        >
          <Link href={sitemap.developers.index}>Developers</Link>
          <Link href={sitemap.learn.index}>Learn</Link>
          <Link href={sitemap.community.index}>Community & Ecosystem</Link>
        </Flex>
        <Flex
          gap="3"
          justify="end"
          css={{
            margin: '$1 0',
          }}
        >
          <Link href={getHref(getHosts().api)} target="_blank">
            API Reference
          </Link>
          <Link href={external.docs} target="_blank">
            Documentation
          </Link>
          <Link href={external.blog} target="_blank">
            Blog
          </Link>
          <Link href={sitemap.foundation.index}>About Sia Foundation</Link>
        </Flex>
      </Flex>
    </Flex>
  )
}
