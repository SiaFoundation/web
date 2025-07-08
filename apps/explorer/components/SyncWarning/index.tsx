import { Text } from '@siafoundation/design-system'
import { getIsSynced, getIsIndexing } from '../../lib/sync'
import { Warning24 } from '@siafoundation/react-icons'
import { getExplored } from '../../lib/explored'

export async function SyncWarning() {
  const explored = await getExplored()
  const [{ data: consensusState }, { data: blockMetrics }] = await Promise.all([
    explored.consensusState(),
    explored.blockMetrics(),
  ])

  const isSynced = getIsSynced(consensusState)
  if (!isSynced) {
    return (
      <div className="w-full px-5 py-3 flex flex-col sm:flex-row gap-2 justify-center items-center bg-gray-100 dark:bg-graydark-50">
        <Warning24 />
        <Text color="contrast" weight="medium" className="text-sm md:text-lg">
          Warning: the siascan explorer is currently syncing, data may be
          incomplete.
        </Text>
      </div>
    )
  }

  const isIndexing = getIsIndexing(consensusState, blockMetrics)

  if (isIndexing) {
    return (
      <div className="w-full px-5 py-3 flex flex-col sm:flex-row gap-2 justify-center items-center bg-gray-100 dark:bg-graydark-50">
        <Warning24 />
        <Text color="contrast" weight="medium" className="text-sm md:text-lg">
          Warning: the siascan explorer is currently indexing, data may be
          incomplete.
        </Text>
      </div>
    )
  }

  return null
}
