import { LockIcon, DiceIcon, GearIcon } from '@siafoundation/react-icons'
import { Panel } from '../../core/Panel'
import { Separator } from '../../core/Separator'
import { Logo } from '../../core/Logo'
import { navbarAppHeight } from '../AppNavbar'
import { SidenavItemWallet } from './SidenavItemWallet'
import { SidenavItem } from './SidenavItem'
import BigNumber from 'bignumber.js'

type Props = {
  routes: {
    login: string
    home: string
    node: {
      index: string
    }
    wallet: {
      view: string
    }
  }
  profile: React.ReactNode
  showWallet?: boolean
  walletBalanceSc?: {
    unconfirmed: BigNumber
    confirmed: BigNumber
    spendable: BigNumber
    immature: BigNumber
  }
  isSynced: boolean
  lock?: () => void
  openSettings: () => void
  children: React.ReactNode
}

export function Sidenav({
  routes,
  profile,
  isSynced,
  showWallet = true,
  walletBalanceSc,
  lock,
  openSettings,
  children,
}: Props) {
  return (
    <Panel
      data-testid="sidenav"
      className="relative overflow-hidden z-10 h-full w-[75px] rounded-none border-y-0"
    >
      <div className="flex flex-col items-center h-full">
        <div
          className="flex items-center justify-center"
          style={{
            height: `${navbarAppHeight}px`,
          }}
        >
          {profile || <Logo size={30} />}
        </div>
        <div className="flex flex-col gap-6 items-center pt-4 pb-6 h-full">
          <div className="flex flex-col gap-6 items-center">{children}</div>
          <div className="flex-1" />
          <Separator className="w-full" />
          {showWallet && (
            <SidenavItemWallet
              routes={routes}
              isSynced={isSynced}
              walletBalanceSc={walletBalanceSc}
            />
          )}
          <SidenavItem title="Blockchain node" route={routes.node.index}>
            <DiceIcon />
          </SidenavItem>
          <SidenavItem title="App preferences" onClick={() => openSettings()}>
            <GearIcon />
          </SidenavItem>
          <SidenavItem title="Lock app" onClick={lock}>
            <LockIcon />
          </SidenavItem>
        </div>
      </div>
    </Panel>
  )
}
