import { Flex, Panel, Separator, Text } from '@siafoundation/design-system'
import { useWalletBalance } from '@siafoundation/react-core'
import { humanSiacoin, humanSiafund } from '@siafoundation/sia-js'

export function WalletBalance() {
  const { data: wallet } = useWalletBalance()

  if (!wallet) {
    return null
  }

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
        <Text size="12" weight="semibold">
          {humanSiacoin(wallet.siacoins)}
        </Text>
        {!!wallet.siafunds && (
          <>
            <Separator orientation="vertical" pad="1-5" size="1" />
            <Text size="12" weight="semibold">
              {humanSiafund(wallet.siafunds)}
            </Text>
          </>
        )}
      </Flex>
    </Panel>
  )
}
