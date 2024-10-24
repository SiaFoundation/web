import { Text } from '@siafoundation/design-system'
import { Unlocked16 } from '@siafoundation/react-icons'
import { useWallets } from '../../contexts/wallets'
import { pluralize } from '@siafoundation/units'

export function WalletsFiltersBar() {
  const { datasetCount, unlockedCount } = useWallets()

  return (
    <div className="flex gap-2 w-full">
      {!!unlockedCount && (
        <div className="flex gap-1.5">
          <Text>
            <Unlocked16 />
          </Text>
          <Text size="12" font="mono">
            {pluralize(unlockedCount, 'wallet')} unlocked
          </Text>
        </div>
      )}
      <div className="flex-1" />
      <Text size="12" font="mono">
        {pluralize(datasetCount, 'wallet')}
      </Text>
    </div>
  )
}
