import {
  NavbarSite,
  FaucetIcon,
  LinkButton,
  Tooltip,
} from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { Search } from './Search'
import { isMainnet, networkName } from '../../config'
import { NavDropdownMenu } from './NavDropdownMenu'
import { Footer } from './Footer'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <div className="relative h-full bg-gray-100 dark:bg-graydark-50 overflow-hidden">
      <div className="relative z-10 h-full overflow-y-auto">
        <NavbarSite appName="explorer" homeHref={routes.home.index}>
          <Search />
          {!isMainnet && (
            <Tooltip content={`${networkName} Faucet`}>
              <LinkButton size="medium" href={routes.faucet.index}>
                <FaucetIcon />
              </LinkButton>
            </Tooltip>
          )}
          <NavDropdownMenu />
        </NavbarSite>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-5 relative mt-5 min-h-[65vh]">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
