import BigNumber from 'bignumber.js'
import { WalletIcon } from '../../icons/WalletIcon'
import { WalletBalanceMini } from '../WalletBalanceMini'
import { SidenavItem } from './SidenavItem'

type Routes = {
  wallet: {
    view: string
  }
}

type Props = {
  walletBalance?: BigNumber
  isSynced: boolean
  routes: Routes
}

export function SidenavItemWallet({ walletBalance, isSynced, routes }: Props) {
  return (
    <SidenavItem title="Wallet" route={routes.wallet.view}>
      <div className="flex flex-col gap-3 items-center">
        <WalletIcon />
        {isSynced && walletBalance && (
          <WalletBalanceMini
            wallet={{
              sc: walletBalance,
            }}
          />
        )}
      </div>
    </SidenavItem>
  )
}
