import {
  Container,
  Flex,
  NextLink,
  Section,
  Text,
  webLinks,
} from '@siafoundation/design-system'
import { sitemap } from '../config/site'
import { Statsbar } from './Statsbar'

export function Footer() {
  return (
    <Flex direction="column">
      <Section size="1" width="flush" css={{ backgroundColor: '$waves' }}>
        <Container>
          <Flex direction="column" align="start" gap="9" css={{ my: '$2' }}>
            <Statsbar />
            <Flex direction="column" align="start" gap="1">
              <Flex
                gap={{
                  '@initial': '2',
                  '@bp2': '3',
                }}
                justify="start"
                align="start"
                wrap="wrap"
                css={{
                  width: '100%',
                  margin: '$1 0',
                }}
              >
                <TopLink href={sitemap.newsroom.index}>Newsroom</TopLink>
                <TopLink href={webLinks.blog} target="_blank">
                  Blog
                </TopLink>
                <TopLink
                  href={
                    sitemap.community.index + '?software=exchanges#software'
                  }
                >
                  Get Siacoin
                </TopLink>
                <TopLink href={sitemap.whitepaper.pdf} target="_blank">
                  Whitepaper
                </TopLink>
              </Flex>
              <Flex
                gap="3"
                justify="start"
                align="start"
                wrap="wrap"
                css={{
                  width: '100%',
                  margin: '$1 0',
                }}
              >
                <BottomLink href={webLinks.discord} target="_blank">
                  Discord
                </BottomLink>
                <BottomLink href={webLinks.reddit} target="_blank">
                  Reddit
                </BottomLink>
                <BottomLink href={webLinks.twitter} target="_blank">
                  Twitter
                </BottomLink>
                <BottomLink href={webLinks.github} target="_blank">
                  GitHub
                </BottomLink>
              </Flex>
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
    <Text
      size={{
        '@initial': '16',
        '@bp2': '20',
      }}
      weight="semibold"
      color="accent"
    >
      <NextLink
        variant="accent"
        css={{
          textDecoration: 'none',
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
      <NextLink css={{ textDecoration: 'none' }} href={href} target={target}>
        {children}
      </NextLink>
    </Text>
  )
}
