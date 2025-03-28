import { Text } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import { getExplored } from '../../lib/explored'
import { getIsSynced } from '../../lib/sync'
import { Warning24 } from '@siafoundation/react-icons'

export async function SyncWarning() {
  const [consensusState, consensusStateError] = await to(
    getExplored().consensusState()
  )

  if (consensusStateError || !consensusState)
    throw new Error(
      'explored consensusState request failed in HardforkCountdown'
    )

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
