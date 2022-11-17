import { Text } from '../core/Text'
import { humanSiacoin, humanSiafund } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'

type Props = {
  wallet: {
    sc: BigNumber | string
    sf?: number
  }
  size?: React.ComponentProps<typeof Text>['size']
}

export function WalletBalanceMini({ size = '12', wallet: { sc, sf } }: Props) {
  return (
    <Text size={size} weight="medium">
      {`${humanSiacoin(sc, { fixed: 0 })} ${
        sf && sf > 0 ? ` | ${humanSiafund(sf)}` : ''
      }`}
    </Text>
  )
}
