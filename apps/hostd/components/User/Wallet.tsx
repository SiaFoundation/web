import { Flex, Panel, Separator, Text } from '@siafoundation/design-system'
import { useWalletBalance } from '@siafoundation/react-core'
import { WalletBalance } from '../WalletBalance'

export function Wallet() {
  const { data: wallet } = useWalletBalance()

  // if (!wallet?.unlocked) {
  //   return null
  // }

  return (
    <Panel
      css={{
        display: 'none',
        '@bp1': {
          display: 'block',
        },
      }}
    >
      <Flex align="center" css={{ height: '28px', padding: '0 $2' }}>
        {wallet && (
          <WalletBalance
            size="12"
            wallet={{ sc: wallet.siacoins, sf: wallet.siafunds }}
          />
        )}
        <Separator orientation="vertical" pad="1-5" size="1" />
        <Text size="12" weight="semibold">
          {Number(wallet?.siafunds || 0).toLocaleString()} SF
        </Text>
      </Flex>
    </Panel>
  )
}
