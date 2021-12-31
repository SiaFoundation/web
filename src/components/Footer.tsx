import Link from 'next/link'
import { appName } from '../config/app'
import { Text } from '../system/Text'
import { Flex } from '../system/Flex'
import { sitemap, social } from '../config/site'
import { Li } from '../system/Li'

export function Footer() {
  return (
    <Flex
      column
      css={{
        position: 'relative',
        gap: '$3',
        marginBottom: '$5',
      }}
    >
      <Flex
        as="ul"
        css={{
          gap: '$3',
          margin: '$1 0',
          justifyContent: 'center',
        }}
      >
        <Li>
          <Link href={sitemap.newsroom.index}>Newsroom</Link>
        </Li>
        <Li>
          <Link href={sitemap.community.getSiacoin}>Get Siacoin</Link>
        </Li>
        <Li>
          <Link href={sitemap.learn.whitepaper}>Whitepaper</Link>
        </Li>
      </Flex>
      <Flex
        as="ul"
        css={{
          gap: '$3',
          margin: '$1 0',
          justifyContent: 'center',
        }}
      >
        <Li>
          <Link href={social.blog} passHref>
            <a target="_blank">Blog</a>
          </Link>
        </Li>
        <Li>
          <Link href={social.discord} passHref>
            <a target="_blank">Discord</a>
          </Link>
        </Li>
        <Li>
          <Link href={social.github} passHref>
            <a target="_blank">Github</a>
          </Link>
        </Li>
        <Li>
          <Link href={social.twitter} passHref>
            <a target="_blank">Twitter</a>
          </Link>
        </Li>
        <Li>
          <Link href={social.reddit} passHref>
            <a target="_blank">Reddit</a>
          </Link>
        </Li>
      </Flex>
    </Flex>
  )
}
