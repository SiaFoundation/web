import {
  Box,
  Container,
  Flex,
  NextLink,
  Rss16,
  Section,
  Text,
} from '@siafoundation/design-system'
import { sitemap, external } from '../config/site'
import { Stats } from '../content/stats'
import { Statsbar } from './Statsbar'

type Props = {
  stats: Stats
}

export function Footer({ stats }: Props) {
  return (
    <Flex direction="column">
      <Statsbar {...stats} />
      <Section size="1" width="flush" css={{ backgroundColor: '$brandGray3' }}>
        <Container>
          <Flex direction="column" align="start" gap="1">
            <Flex
              gap="3"
              justify="center"
              align="start"
              wrap="wrap"
              css={{
                margin: '$1 0',
              }}
            >
              <Flex gap="1">
                <TopLink href={sitemap.newsroom.index}>Newsroom</TopLink>
                <TopLink href={sitemap.newsroom.feed.rss} target="_blank">
                  <Rss16 />
                </TopLink>
              </Flex>
              <TopLink href={external.blog} target="_blank">
                Blog
              </TopLink>
              <TopLink
                href={sitemap.community.index + '?software=exchanges#software'}
              >
                Get Siacoin
              </TopLink>
              <TopLink href={sitemap.whitepaper.pdf} target="_blank">
                Whitepaper
              </TopLink>
            </Flex>
            <Flex
              gap="3"
              justify="center"
              align="start"
              wrap="wrap"
              css={{
                margin: '$1 0',
              }}
            >
              <BottomLink href={external.blog} target="_blank">
                Blog
              </BottomLink>
              <BottomLink href={external.discord} target="_blank">
                Discord
              </BottomLink>
              <BottomLink href={external.reddit} target="_blank">
                Reddit
              </BottomLink>
              <BottomLink href={external.twitter} target="_blank">
                Twitter
              </BottomLink>
              <BottomLink href={external.github} target="_blank">
                Github
              </BottomLink>
              <BottomLink href={external.forum} target="_blank">
                Forum
              </BottomLink>
            </Flex>
          </Flex>
        </Container>
      </Section>
    </Flex>
  )
}

type LinkProps = {
  children: React.ReactNode
  href: string
  target?: string
}

function TopLink({ children, href, target }: LinkProps) {
  return (
    <Text size="20" weight="semibold" color="accent">
      <NextLink
        variant="accent"
        css={{
          textDecoration: 'none',
          fontFamily: '$sans',
        }}
        href={href}
        target={target}
      >
        {children}
      </NextLink>
    </Text>
  )
}

function BottomLink({ children, href, target }: LinkProps) {
  return (
    <Text size="14">
      <NextLink
        css={{ fontFamily: '$sans', textDecoration: 'none' }}
        href={href}
        target={target}
      >
        {children}
      </NextLink>
    </Text>
  )
}
