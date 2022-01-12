import { Flex } from '../system/Flex'
import { sitemap, external } from '../config/site'
import { Link } from '../system/Link'

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
        <Link href={sitemap.newsroom.index}>Newsroom</Link>
        <Link href={sitemap.community.getSiacoin}>Get Siacoin</Link>
        <Link href={sitemap.learn.whitepaper}>Whitepaper</Link>
      </Flex>
      <Flex
        gap="3"
        justify="center"
        css={{
          margin: '$1 0',
        }}
      >
        <Link href={external.blog} target="_blank">
          Blog
        </Link>
        <Link href={external.discord} target="_blank">
          Discord
        </Link>
        <Link href={external.github} target="_blank">
          Github
        </Link>
        <Link href={external.twitter} target="_blank">
          Twitter
        </Link>
        <Link href={external.reddit} target="_blank">
          Reddit
        </Link>
      </Flex>
    </Flex>
  )
}
