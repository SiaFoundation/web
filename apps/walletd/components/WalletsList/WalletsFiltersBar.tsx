import { PaginatorKnownTotal, Text } from '@siafoundation/design-system'
import { Unlocked16 } from '@siafoundation/react-icons'
import { useWallets } from '../../contexts/wallets'
import { pluralize } from '@siafoundation/units'

export function WalletsFiltersBar() {
  const { datasetTotal, unlockedCount, offset, limit, datasetState } =
    useWallets()

  return (
    <div className="flex items-center gap-2 w-full">
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
        {pluralize(datasetTotal, 'wallet')}
      </Text>
      <PaginatorKnownTotal
        offset={offset}
        limit={limit}
        total={datasetTotal}
        isLoading={datasetState === 'loading'}
      />
    </div>
  )
}
