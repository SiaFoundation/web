import {
  Container,
  Heading,
  Link,
  Logo,
  Tooltip,
  webLinks,
} from '@siafoundation/design-system'
import { LogoDiscord16, LogoGithub16 } from '@siafoundation/react-icons'
import { cx } from 'class-variance-authority'
import { menuSections } from '../../../config/siteMap'
import { SiteMenu } from '../SiteMenu'
import { NavMenu } from './NavMenu'

export function Navbar({
  size = '4',
  scrolledDown,
}: {
  size?: '4' | 'full'
  scrolledDown: boolean
}) {
  return (
    <Container
      size={size}
      pad={false}
      className={cx(
        'relative',
        // !scrolledDown ? 'rounded-t-[5px]' : '',
        'bg-white dark:bg-graydark-50',
        'sticky top-0 z-20',
        'h-[60px]',
      )}
    >
      <div
        className={cx(
          'absolute w-full left-0 top-0 flex items-center',
          'px-5 md:px-10',
          scrolledDown ? 'py-0 border-b-2' : 'py-6',
          scrolledDown ? 'h-[60px]' : 'h-[100px]',
          'border-gray-400/50 dark:border-graydark-400/50',
          'transition-all',
          'duration-300',
        )}
      >
        <Link href="/" underline="none">
          <Heading size="32" className="flex gap-1.5 items-center">
            <Logo size={scrolledDown ? 35 : 40} className="transition-all" />
            <Heading
              font="mono"
              size="24"
              className="hidden pl-0 pr-px md:block tracking-tight relative -top-px"
            >
              sia
            </Heading>
          </Heading>
        </Link>
        <div className="flex-1" />
        <NavMenu />
        <div className="gap-8 items-center flex">
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
