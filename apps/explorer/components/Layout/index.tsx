import { LinkButton, Tooltip } from '@siafoundation/design-system'
import { FaucetIcon } from '@siafoundation/react-icons'
import { appName, isMainnet, network, networkName } from '../../config'
import { routes } from '../../config/routes'
import { Footer } from './Footer'
import { NavDropdownMenu } from './NavDropdownMenu'
import { Navbar } from './Navbar'
import { Search } from './Search'

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
        <div className="flex flex-col">
          <div className="flex flex-col gap-5 pt-5">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
