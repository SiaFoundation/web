import {
  Container,
  Heading,
  Link,
  Logo,
  LogoDiscord16,
  LogoGithub16,
  NavMenuIndicator,
  NavMenuList,
  NavMenuRoot,
  NavMenuViewport,
  panelStyles,
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
        'relative',
        'bg-white dark:bg-graydark-50',
        'sticky top-0 z-20',
        'h-[60px]',
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
        <NavMenuRoot className="relative flex gap-6 items-center pl-[100px] pr-10">
          <NavMenuList>
            <div className="gap-5 items-center hidden md:flex">
              <RentNav />
              <HostNav />
              <WalletNav />
              <GrantsNav />
            </div>
            <NavMenuIndicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
              <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-gray-400 dark:bg-graydark-400" />
            </NavMenuIndicator>
          </NavMenuList>
          <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
            <NavMenuViewport
              className={cx(
                'relative',
                'data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut',
                'origin-[top_center] overflow-hidden rounded-[6px] transition-[width,_height] duration-300',
                'mt-[10px] h-[var(--radix-navigation-menu-viewport-height)]',
                'w-full sm:w-[var(--radix-navigation-menu-viewport-width)]',
                panelStyles()
              )}
            />
          </div>
        </NavMenuRoot>
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
    </Container>
  )
}
