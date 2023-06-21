import { Text } from '@siafoundation/design-system'
import { useWallets } from '../../contexts/wallets'

export function WalletsFiltersBar() {
  const { datasetCount } = useWallets()

  return (
    <div className="flex gap-2 justify-end w-full">
      <Text size="12" font="mono">
        {datasetCount === 1
          ? '1 wallet'
          : `${datasetCount.toLocaleString()} wallets`}
      </Text>
    </div>
  )
}
