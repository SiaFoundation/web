import { useWalletBalance } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { Flex } from '../../core/Flex'
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
      <Flex direction="column" gap="1-5" align="center">
        <WalletIcon />
        {balance.data && (
          <WalletBalanceMini
            size="10"
            wallet={{
              sc: new BigNumber(balance.data),
            }}
          />
        )}
      </Flex>
    </SidenavItem>
  )
}
