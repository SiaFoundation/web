import { Text } from '../core'
import { humanSiacoin, humanSiafund } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'

type Props = {
  wallet: {
    sc: BigNumber | string
    sf?: number
  }
  size?: React.ComponentProps<typeof Text>['size']
}

export function WalletBalanceMini({ size = '14', wallet: { sc, sf } }: Props) {
  return (
    <Text size={size} weight="semibold">
      {`${humanSiacoin(sc, { fixed: 0 })} ${
        sf && sf > 0 ? ` | ${humanSiafund(sf)}` : ''
      }`}
    </Text>
  )
}
