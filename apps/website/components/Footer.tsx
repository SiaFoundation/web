import { Flex, NLink } from '@siafoundation/design-system'
import { sitemap, external } from '../config/site'

export function Footer() {
  return (
    <Flex
      direction="column"
      gap="3"
      css={{
        marginBottom: '$5',
      }}
    >
      <Flex
        gap="3"
        justify="center"
        css={{
          margin: '$1 0',
        }}
      >
        <NLink href={sitemap.newsroom.index}>Newsroom</NLink>
        <NLink href={sitemap.community.getSiacoin}>Get Siacoin</NLink>
        <NLink href={sitemap.learn.whitepaper}>Whitepaper</NLink>
      </Flex>
      <Flex
        gap="3"
        justify="center"
        css={{
          margin: '$1 0',
        }}
      >
        <NLink href={external.blog} target="_blank">
          Blog
        </NLink>
        <NLink href={external.discord} target="_blank">
          Discord
        </NLink>
        <NLink href={external.github} target="_blank">
          Github
        </NLink>
        <NLink href={external.twitter} target="_blank">
          Twitter
        </NLink>
        <NLink href={external.reddit} target="_blank">
          Reddit
        </NLink>
      </Flex>
    </Flex>
  )
}
