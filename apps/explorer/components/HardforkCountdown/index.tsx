import { Text } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import { getExplored } from '../../lib/explored'
import clsx from 'clsx'
import { blocksToDays } from '@siafoundation/units'
import { getIsIndexing, getIsSynced } from '../../lib/sync'

function LearnMore({ color }: { color: string }) {
  return (
    <a
      href="https://docs.sia.tech/navigating-the-v2-hardfork/v2"
      target="_blank"
      rel="noreferrer"
      className={clsx(
        'rounded py-1 px-2 inline-block font-sans text-white dark:text-graydark-50',
        'font-normal text-sm inline-flex items-center justify-center gap-1 cursor-pointer w-full max-w-[381px] sm:max-w-none sm:w-auto',
        color
      )}
    >
      Learn more
    </a>
  )
}

export async function HardforkCountdown({ network }: { network: string }) {
  const isMainnet = network === 'mainnet'
  const networkName = isMainnet ? 'mainnet' : 'the zen network'
  const [
    [chainIndex, chainIndexError],
    [consensusNetwork, consensusNetworkError],
    [consensusState, consensusStateError],
    [blockMetrics, blockMetricsError],
  ] = await Promise.all([
    to(getExplored().consensusTip()),
    to(getExplored().consensusNetwork()),
    to(getExplored().consensusState()),
    to(getExplored().blockMetrics()),
  ])

  if (chainIndexError || !chainIndex)
    throw new Error('explored consensusTip request failed in HardforkCountdown')
  if (consensusNetworkError || !consensusNetwork)
    throw new Error(
      'explored consensusNetwork request failed in HardforkCountdown'
    )
  if (consensusStateError || !consensusState)
    throw new Error(
      'explored consensusState request failed in HardforkCountdown'
    )
  if (blockMetricsError || !blockMetrics)
    throw new Error('explored blockMetrics request failed in HardforkCountdown')

  // If the node is not synced, don't show the countdown.
  const isSynced = getIsSynced(consensusState)
  if (!isSynced) {
    return null
  }

  // If the node is indexing, don't show the countdown.
  const isIndexing = getIsIndexing(consensusState, blockMetrics)
  if (isIndexing) {
    return null
  }

  const allowHeight = consensusNetwork.hardforkV2.allowHeight
  const requireHeight = consensusNetwork.hardforkV2.requireHeight

  const linkColor = isMainnet
    ? 'bg-green-500 dark:bg-green-400'
    : 'bg-amber-500 dark:bg-amber-400'

  if (chainIndex.height >= requireHeight) {
    return (
      <div className="w-full px-5 py-3 flex flex-col sm:flex-row gap-2 justify-center items-center bg-gray-100 dark:bg-graydark-50">
        <Text color="contrast" weight="medium" className="text-sm md:text-lg">
          The V2 Hardfork update is now required on {networkName}
        </Text>
        <LearnMore color={linkColor} />
      </div>
    )
  }

  const isRequireTimeActive = chainIndex.height >= allowHeight
  const selectedHeight = isRequireTimeActive ? requireHeight : allowHeight
  const blocksRemaining = selectedHeight - chainIndex.height
  const daysRemaining = Math.ceil(blocksToDays(blocksRemaining))

  return (
    <div className="w-full px-5 py-3 flex flex-col sm:flex-row gap-2 justify-center items-center bg-gray-100 dark:bg-graydark-50">
      <Text color="contrast" weight="medium" className="text-sm md:text-lg">
        V2 Hardfork {isRequireTimeActive ? 'is required' : 'activates'} on{' '}
        {networkName} in {daysRemaining} days at block height{' '}
        {selectedHeight.toLocaleString()}
      </Text>
      <LearnMore color={linkColor} />
    </div>
  )
}
