import {
  Container,
  Heading,
  Link,
  Logo,
  LogoDiscord16,
  LogoGithub16,
  Tooltip,
  webLinks,
} from '@siafoundation/design-system'
import { useScrollTop } from '../../../hooks/useScrollTop'
import { cx } from 'class-variance-authority'
import { menuSections } from '../../../config/siteMap'
import { SiteMenu } from '../SiteMenu'
import { RentNav } from './RentNav'
import { HostNav } from './HostNav'
import { WalletNav } from './WalletNav'
import { GrantsNav } from './GrantsNav'

export function Navbar() {
  const { scrollTop } = useScrollTop()
  const scrolledDown = scrollTop > 100

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
            <RentNav />
            <HostNav />
            <WalletNav />
            <GrantsNav />
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
