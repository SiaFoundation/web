import { Text } from '@siafoundation/design-system'
import { humanSiacoin, humanSiafund } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'

type Props = {
  wallet: {
    sc: BigNumber | string
    sf: number
  }
  size?: React.ComponentProps<typeof Text>['size']
}

export function WalletBalance({ size = '14', wallet: { sc, sf } }: Props) {
  return (
    <Text size={size} weight="semibold">
      {`${humanSiacoin(sc)} ${sf > 0 ? ` / ${humanSiafund(sf)}` : ''}`}
    </Text>
  )
}
