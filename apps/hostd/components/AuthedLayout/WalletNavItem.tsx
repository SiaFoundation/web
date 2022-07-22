import { Flex, WalletIcon } from '@siafoundation/design-system'
import { Wallet } from '../../contexts/wallets'
import { routes } from '../../config/routes'
import { WalletBalance } from '../WalletBalance'
import { NavItem } from './NavItem'

type Props = {
  wallet: Wallet
  active?: boolean
  onClick?: () => void
}

export function WalletNavItem({ wallet, active, onClick }: Props) {
  const { id } = wallet
  const route = routes.wallet.view.replace('[id]', id)
  return (
    <NavItem title="Wallet" route={route}>
      <Flex direction="column" gap="1-5" align="center">
        <WalletIcon />
        <WalletBalance size="10" wallet={wallet} />
      </Flex>
    </NavItem>
  )
}
