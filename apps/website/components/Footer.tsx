import { Flex, NLink, Rss16 } from '@siafoundation/design-system'
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
        <Flex gap="1">
          <NLink href={sitemap.newsroom.index}>Newsroom</NLink>
          <NLink href={sitemap.newsroom.feed.rss}>
            <Rss16 />
          </NLink>
        </Flex>
        <NLink href={sitemap.whitepaper.index}>Whitepaper</NLink>
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
        <NLink href={external.reddit} target="_blank">
          Reddit
        </NLink>
        <NLink href={external.twitter} target="_blank">
          Twitter
        </NLink>
        <NLink href={external.github} target="_blank">
          Github
        </NLink>
        <NLink href={external.forum} target="_blank">
          Forum
        </NLink>
      </Flex>
    </Flex>
  )
}
