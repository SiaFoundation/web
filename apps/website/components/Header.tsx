import { Flex, Heading, NLink, Text } from '@siafoundation/design-system'
import { getHosts } from '@siafoundation/env'
import { appName } from '../config/app'
import { sitemap, external } from '../config/site'
import { getHref } from '../lib/url'

const hosts = getHosts()

export function Header() {
  return (
    <Flex align="center" justify="between">
      <Flex direction="column">
        <NLink href={sitemap.home.index}>
          <Heading size="3">{appName}</Heading>
        </NLink>
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
          <NLink href={sitemap.developers.index}>Developers</NLink>
          <NLink href={sitemap.learn.index}>Learn</NLink>
          <NLink href={sitemap.community.index}>Community & Ecosystem</NLink>
        </Flex>
        <Flex
          gap="3"
          justify="end"
          css={{
            margin: '$1 0',
          }}
        >
          <NLink href={getHref(hosts.api)} target="_blank">
            API Reference
          </NLink>
          <NLink href={external.docs} target="_blank">
            Documentation
          </NLink>
          <NLink href={external.blog} target="_blank">
            Blog
          </NLink>
          <NLink href={sitemap.foundation.index}>About Sia Foundation</NLink>
        </Flex>
      </Flex>
    </Flex>
  )
}
