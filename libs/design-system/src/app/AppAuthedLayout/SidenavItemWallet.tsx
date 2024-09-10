import BigNumber from 'bignumber.js'
import { WalletIcon } from '@siafoundation/react-icons'
import { WalletBalanceSideNav } from '../WalletBalanceSideNav'
import { SidenavItem } from './SidenavItem'

type Routes = {
  wallet: {
    view: string
  }
}

type Props = {
  walletBalanceSc?: {
    unconfirmed: BigNumber
    confirmed: BigNumber
    spendable: BigNumber
    immature: BigNumber
  }
  isSynced: boolean
  routes: Routes
}

export function SidenavItemWallet({
  walletBalanceSc,
  isSynced,
  routes,
}: Props) {
  return (
    <SidenavItem title="Wallet" route={routes.wallet.view}>
      <div className="flex flex-col gap-3 items-center">
        <WalletIcon />
        {isSynced && walletBalanceSc && (
          <WalletBalanceSideNav
            isSynced={isSynced}
            balanceSc={walletBalanceSc}
          />
        )}
      </div>
    </SidenavItem>
  )
}
