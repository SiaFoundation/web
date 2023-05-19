import {
  Application16,
  Container,
  Heading,
  Link,
  Linux16,
  Logo,
  LogoDiscord16,
  LogoGithub16,
  PlayOutline16,
  Schematics16,
  Stamp16,
  Terminal16,
  TestToolIcon,
  Text,
  Tooltip,
  Wallet16,
  webLinks,
} from '@siafoundation/design-system'
import { useScrollTop } from '../../hooks/useScrollTop'
import { cx } from 'class-variance-authority'
import { routes } from '../../config/routes'
import { menuSections } from '../../config/siteMap'
import { SiteMenu } from './SiteMenu'
import { useRouter } from 'next/router'
import { NavbarHoverCard } from './NavbarHoverCard'

export function Navbar() {
  const { scrollTop } = useScrollTop()
  const scrolledDown = scrollTop > 100
  const router = useRouter()

  return (
    <Container
      size="4"
      pad={false}
      className={cx(
        'bg-white dark:bg-graydark-50',
        'sticky top-0 z-20',
        'h-[60px]',
        // scrollTop > 0 ? '' : 'rounded-t-lg',
        'transition-all'
      )}
    >
      <div
        className={cx(
          'absolute w-full left-0 top-0 flex items-center',
          'px-5 md:px-10',
          scrolledDown ? 'py-0 border-b-2' : 'py-6',
          scrolledDown ? 'h-[60px]' : 'h-[100px]',
          'border-gray-400/50 dark:border-graydark-400/50',
          'transition-all'
        )}
      >
        <Link href="/">
          <Heading size="32" className="flex gap-1 items-center">
            <Logo size={scrolledDown ? 35 : 40} className="transition-all" />
          </Heading>
        </Link>
        <div className="flex-1" />
        <div className="flex gap-6 items-center">
          <div className="gap-5 items-center hidden md:flex">
            <NavbarHoverCard
              trigger={
                <Link
                  weight="medium"
                  underline={
                    router.asPath.startsWith(routes.rent.index)
                      ? 'accent'
                      : 'hover'
                  }
                  href={routes.rent.index}
                >
                  Rent
                </Link>
              }
              title="Rent storage space on the Sia network."
            >
              <Text color="verySubtle">Software</Text>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.rent.coreSoftware}
                className="flex gap-2 items-center"
              >
                <Terminal16 />
                Core software
              </Link>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.rent.thirdPartySoftware}
                className="flex gap-2 items-center"
              >
                <Application16 />
                Third-party software
              </Link>
              <Text color="verySubtle">Guides</Text>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.rent.mediaStorage}
                className="flex gap-2 items-center"
              >
                <PlayOutline16 />
                Media streaming and storage
              </Link>
              {/* <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.rent.mediaStorage}
                className="flex gap-2 items-center"
              >
                <Network_116 />
                Enterprise object-storage
              </Link> */}
            </NavbarHoverCard>
            <NavbarHoverCard
              trigger={
                <Link
                  weight="medium"
                  underline={
                    router.asPath.startsWith(routes.host.index)
                      ? 'accent'
                      : 'hover'
                  }
                  href={routes.host.index}
                >
                  Host
                </Link>
              }
              title={'Offer your storage space on the Sia network.'}
            >
              <Text color="verySubtle">Software</Text>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.host.coreSoftware}
                className="flex gap-2 items-center"
              >
                <Terminal16 />
                Core software
              </Link>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.host.thirdPartySoftware}
                className="flex gap-2 items-center"
              >
                <Application16 />
                Third-party software
              </Link>
              <Text color="verySubtle">Guides</Text>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.host.guides}
                className="flex gap-2 items-center"
              >
                <Linux16 />
                Hosting on different operating systems
              </Link>
            </NavbarHoverCard>
            <NavbarHoverCard
              trigger={
                <Link
                  weight="medium"
                  underline={
                    router.asPath.startsWith(routes.wallet.index)
                      ? 'accent'
                      : 'hover'
                  }
                  href={routes.wallet.index}
                >
                  Wallet
                </Link>
              }
              title={'Manage your wallet on the Sia network.'}
            >
              <Text color="verySubtle">Software</Text>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.wallet.coreSoftware}
                className="flex gap-2 items-center"
              >
                <Terminal16 />
                Core software
              </Link>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.wallet.thirdPartySoftware}
                className="flex gap-2 items-center"
              >
                <Application16 />
                Third-party software
              </Link>
              <Text color="verySubtle">Guides</Text>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.wallet.guides}
                className="flex gap-2 items-center"
              >
                <Wallet16 />
                Setting up a Ledger hardware wallet
              </Link>
            </NavbarHoverCard>
            <NavbarHoverCard
              trigger={
                <Link
                  weight="medium"
                  underline={
                    router.asPath.startsWith(routes.grants.index)
                      ? 'accent'
                      : 'hover'
                  }
                  href={routes.grants.index}
                >
                  Grants
                </Link>
              }
              title={'Learn about the Sia Grants program.'}
            >
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.grants.process}
                className="flex gap-2 items-center"
              >
                <Schematics16 />
                The grant process
              </Link>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.grants.ideas}
                className="flex gap-2 items-center"
              >
                <Application16 />
                Grant ideas
              </Link>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.grants.applicantFaq}
                className="flex gap-2 items-center"
              >
                <TestToolIcon size={16} />
                Grant applicant FAQ
              </Link>
              <Link
                underline="hover"
                weight="medium"
                size="14"
                href={routes.grants.approvedFaq}
                className="flex gap-2 items-center"
              >
                <Stamp16 />
                Approved grantee FAQ
              </Link>
            </NavbarHoverCard>
          </div>
          <div className="gap-5 items-center hidden md:flex">
            <Tooltip side="bottom" content="Discord">
              <Link href={webLinks.discord} target="_blank">
                <LogoDiscord16 />
              </Link>
            </Tooltip>
            <Tooltip side="bottom" content="GitHub">
              <Link href={webLinks.github.index} target="_blank">
                <LogoGithub16 />
              </Link>
            </Tooltip>
          </div>
          <SiteMenu menuSections={menuSections} />
        </div>
      </div>
    </Container>
  )
}
