import {
  NavbarSite,
  Container,
  getImageProps,
  Heading,
  Link,
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
    <div className="relative h-full bg-white dark:bg-graydark-50 overflow-hidden">
      <PageHead
        appLink={webLinks.explore}
        appName={appName}
        title={title}
        description={description}
        path={path}
        image={previewImageProps.src}
      />
      <ScrollArea id="main-scroll">
        <div className="relative z-10 overflow-hidden">
          <NavbarSite appName="explorer" homeHref={routes.home.index}>
            <Search />
            <UserDropdownMenu />
          </NavbarSite>
          <div className="flex flex-col gap-16 w-full">
            <div className="flex flex-col gap-1">
              <div className="z-0 relative flex items-center gap-1 w-full h-[300px] overflow-hidden border-t border-b border-gray-200 dark:border-graydark-200">
                <div
                  className="z-0 relative w-full h-full"
                  style={{
                    background: `url(${backgroundImageProps.src})`,
                    backgroundSize: 'cover',
                  }}
                />
                <div className="absolute h-full w-full mix-blend-darken z-10 bg-mask" />
              </div>
              <div className="flex flex-col gap-16 relative top-[-180px]">
                {children}
              </div>
              <Container className="pt-20">
                <Separator className="w-full" />
                <div className="flex flex-wrap gap-1 justify-between gap-y-12 py-10">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                      <Text>
                        <SimpleLogoIcon size={100} />
                      </Text>
                      <div className="flex flex-col gap-4 justify-center">
                        <Heading font="mono">explorer</Heading>
                        <div className="flex gap-2 justify-center">
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
                        </div>
                        <div className="flex gap-2">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-12">
                    <div className="flex flex-col gap-3">
                      <Text
                        size="14"
                        className="mb-3"
                        color="subtle"
                        weight="medium"
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
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

type LinkProps = {
  children: React.ReactNode
  href: string
  target?: string
}

function BottomLink({ children, href, target }: LinkProps) {
  return (
    <Link
      underline="hover"
      href={href}
      target={target}
      weight="medium"
      size="14"
    >
      {children}
    </Link>
  )
}
