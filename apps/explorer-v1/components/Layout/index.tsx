import {
  NavbarSite,
  Box,
  Container,
  Flex,
  getImageProps,
  Heading,
  Link,
  NextLink,
  ScrollArea,
  Separator,
  SimpleLogoIcon,
  Text,
  UserDropdownMenu,
  webLinks,
  RedditIcon,
  LogoDiscord24,
  LogoTwitter24,
  LogoGithub24,
  PageHead,
} from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import backgroundImage from '../../assets/leaves-background.png'
import previewImage from '../../assets/leaves-preview.png'
import { Search } from './Search'
import { appName } from '../../config'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

type Props = {
  title: string
  description: string
  path: string
  children: React.ReactNode
}

export function Layout({ title, description, path, children }: Props) {
  return (
    <Box
      css={{
        position: 'relative',
        height: '100%',
        background: '$loContrast',
        overflow: 'hidden',
      }}
    >
      <PageHead
        appLink={webLinks.explore}
        appName={appName}
        title={title}
        description={description}
        path={path}
        image={previewImageProps.src}
      />
      <ScrollArea id="main-scroll">
        <Box
          css={{
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <NavbarSite appName="explorer" homeHref={routes.home.index}>
            <Search />
            <UserDropdownMenu />
          </NavbarSite>
          <Flex direction="column" gap="8" css={{ width: '100%' }}>
            <Flex direction="column">
              <Flex
                css={{
                  position: 'relative',
                  width: '100%',
                  height: '300px',
                  overflow: 'hidden',
                  borderTop: '2px solid $gray3',
                  borderBottom: '2px solid $gray3',
                  zIndex: 0,
                }}
                align="center"
              >
                <Box
                  css={{
                    zIndex: 0,
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    background: `url(${backgroundImageProps.src})`,
                    backgroundSize: 'cover',
                  }}
                />
                <Box
                  css={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    mixBlendMode: 'darken',
                    zIndex: 1,
                    backgroundColor: '$subtleAccentMask',
                  }}
                />
              </Flex>
              <Flex
                direction="column"
                gap="8"
                css={{
                  position: 'relative',
                  top: '-180px',
                }}
              >
                {children}
              </Flex>
              <Container css={{ paddingTop: '$11' }}>
                <Separator className="w-full" />
                <Flex
                  justify="between"
                  wrap="wrap"
                  gapY="6"
                  css={{ padding: '$5 0' }}
                >
                  <Flex direction="column" gap="2">
                    <Flex align="center" gap="2">
                      <Box css={{ color: '$hiContrast' }}>
                        <SimpleLogoIcon size={100} />
                      </Box>
                      <Flex direction="column" gap="2" justify="center">
                        <Heading font="mono">explorer</Heading>
                        <Flex gap="1" justify="center">
                          <Text color="subtle">
                            <Link href="https://keops.cc" target="_blank">
                              Keops
                            </Link>
                          </Text>
                          <Text color="subtle">x</Text>
                          <Text color="subtle">
                            <Link href="https://sia.tech" target="_blank">
                              The Sia Foundation
                            </Link>
                          </Text>
                        </Flex>
                        <Flex gap="1">
                          <BottomLink href={webLinks.discord} target="_blank">
                            <LogoDiscord24 />
                          </BottomLink>
                          <BottomLink
                            href={webLinks.github.index}
                            target="_blank"
                          >
                            <LogoGithub24 />
                          </BottomLink>
                          <BottomLink href={webLinks.reddit} target="_blank">
                            <RedditIcon size={24} />
                          </BottomLink>
                          <BottomLink href={webLinks.twitter} target="_blank">
                            <LogoTwitter24 />
                          </BottomLink>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex gap="6">
                    <Flex direction="column" gap="3">
                      <Text
                        font="mono"
                        weight="bold"
                        size="14"
                        css={{ marginBottom: '$1', color: '$gray9' }}
                      >
                        Ecosystem
                      </Text>
                      <BottomLink href={webLinks.siaStats} target="_blank">
                        SiaStats
                      </BottomLink>
                      <BottomLink href={webLinks.storageStats} target="_blank">
                        Sia Central Host Browser
                      </BottomLink>
                      <BottomLink
                        href={webLinks.hostTroubleshoot}
                        target="_blank"
                      >
                        Sia Central Host Troubleshoot
                      </BottomLink>
                      <BottomLink href={webLinks.coinmarketcap} target="_blank">
                        Coinmarketcap
                      </BottomLink>
                    </Flex>
                  </Flex>
                </Flex>
              </Container>
            </Flex>
          </Flex>
        </Box>
      </ScrollArea>
    </Box>
  )
}

type LinkProps = {
  children: React.ReactNode
  href: string
  target?: string
}

function BottomLink({ children, href, target }: LinkProps) {
  return (
    <Text weight="semibold" size="14">
      <NextLink css={{ textDecoration: 'none' }} href={href} target={target}>
        {children}
      </NextLink>
    </Text>
  )
}
