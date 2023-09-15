import { FaucetIcon, LinkButton, Tooltip } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { Search } from './Search'
import { isMainnet, network, networkName, appName } from '../../config'
import { NavDropdownMenu } from './NavDropdownMenu'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <div className="relative h-full bg-gray-100 dark:bg-graydark-50 overflow-hidden">
      <div className="relative z-10 h-full overflow-y-auto">
        <Navbar
          appName={appName}
          homeHref={routes.home.index}
          network={network}
        >
          <Search />
          {!isMainnet && (
            <Tooltip content={`${networkName} Faucet`}>
              <LinkButton
                size="medium"
                href={routes.faucet.index}
                className="hidden md:flex"
              >
                <FaucetIcon />
              </LinkButton>
            </Tooltip>
          )}
          <NavDropdownMenu />
        </Navbar>
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
