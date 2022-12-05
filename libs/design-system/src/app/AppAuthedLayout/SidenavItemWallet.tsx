import { useWalletBalance } from '@siafoundation/react-core'
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
  routes: Routes
}

export function SidenavItemWallet({ routes }: Props) {
  const balance = useWalletBalance()
  return (
    <SidenavItem title="Wallet" route={routes.wallet.view}>
      <div className="flex flex-col gap-3 items-center">
        <WalletIcon />
        {balance.data && (
          <WalletBalanceMini
            wallet={{
              sc: new BigNumber(balance.data),
            }}
          />
        )}
      </div>
    </SidenavItem>
  )
}
