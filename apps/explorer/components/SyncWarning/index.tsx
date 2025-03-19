import { Text } from '@siafoundation/design-system'
import { getIsSynced } from '../../lib/sync'
import { Warning24 } from '@siafoundation/react-icons'
import { fetchConsensusState } from '../../lib/fetchChainData'

export async function SyncWarning() {
  const consensusState = await fetchConsensusState()

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

  return null
}
