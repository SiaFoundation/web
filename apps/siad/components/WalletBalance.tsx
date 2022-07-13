import { Text } from '@siafoundation/design-system'
import { Wallet } from '../contexts/wallets'
import { humanSiacoin, humanSiafund } from '@siafoundation/sia-js'

type Props = {
  wallet: Wallet
  size?: React.ComponentProps<typeof Text>['size']
}

export function WalletBalance({ size = '14', wallet: { sc, sf } }: Props) {
  return (
    <Text size={size} weight="semibold">
      {`${humanSiacoin(sc)} ${sf > 0 ? ` / ${humanSiafund(sf)}` : ''}`}
    </Text>
  )
}
