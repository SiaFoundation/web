import { Flex, WalletIcon } from '@siafoundation/design-system'
import { useWalletBalance } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { routes } from '../../config/routes'
import { WalletBalanceMini } from '../WalletBalanceMini'
import { NavItem } from './NavItem'

export function NavItemWallet() {
  const balance = useWalletBalance()
  return (
    <NavItem title="Wallet" route={routes.wallet.view}>
      <Flex direction="column" gap="1-5" align="center">
        <WalletIcon />
        {balance.data && (
          <WalletBalanceMini
            size="10"
            wallet={{
              sc: new BigNumber(balance.data?.siacoins),
              sf: balance.data?.siafunds,
            }}
          />
        )}
      </Flex>
    </NavItem>
  )
}
