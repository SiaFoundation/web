import { LinkButton, Tooltip } from '@siafoundation/design-system'
import { FaucetIcon } from '@siafoundation/react-icons'
import { routes } from '../../config/routes'
import { Search } from './Search'
import { isMainnet, network, networkName, appName } from '../../config'
import { NavDropdownMenu } from './NavDropdownMenu'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { HardforkCountdown } from '../HardforkCountdown'
import { SyncWarning } from '../SyncWarning'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <div className="relative h-full bg-gray-100 dark:bg-graydark-50 overflow-hidden">
      <div className="relative z-10 h-full overflow-y-auto">
        <SyncWarning />
        <HardforkCountdown network={network} />
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

export function LayoutFullscreen({ children }: Props) {
  return (
    <div className="relative h-full bg-gray-100 dark:bg-graydark-50 overflow-hidden">
      <div className="relative z-10 h-full flex flex-col">
        <SyncWarning />
        <HardforkCountdown network={network} />
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
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
