import { Text } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import { getExplored } from '../../lib/explored'
import clsx from 'clsx'

function LearnMore({ color }: { color: string }) {
  return (
    <a
      href="https://docs.sia.tech/navigating-the-v2-hardfork/v2"
      target="_blank"
      rel="noreferrer"
      className={clsx(
        'rounded py-1 px-2 inline-block font-sans text-white dark:text-graydark-50',
        'font-normal text-sm inline-flex items-center gap-1 cursor-pointer',
        color
      )}
    >
      Learn more
    </a>
  )
}

export async function HardforkCountdown({ network }: { network: string }) {
  const isMainnet = network === 'mainnet'
  const [chainIndex, chainIndexError] = await to(getExplored().consensusTip())
  if (chainIndexError || !chainIndex)
    throw new Error('explored consensusTip request failed in HardforkCountdown')

  const allowHeight = isMainnet ? 526000 : 112000
  const allowTime = new Date(
    isMainnet ? '2025-06-06T02:00:00.000Z' : '2025-03-01T07:00:00.000Z'
  )

  const requireHeight = isMainnet ? 530000 : 114000
  const requireTime = new Date(
    isMainnet ? '2025-07-04T02:00:00.000Z' : '2025-03-15T06:00:00.000Z'
  )

  const linkColor = isMainnet
    ? 'bg-green-500 dark:bg-green-400'
    : 'bg-amber-500 dark:bg-amber-400'

  const currentTime = new Date()
  const isRequireTimeActive = currentTime >= allowTime
  const selectedTime = isRequireTimeActive ? requireTime : allowTime
  const selectedHeight = isRequireTimeActive ? requireHeight : allowHeight

  const daysRemaining = Math.ceil(
    (selectedTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (chainIndex.height >= requireHeight) {
    return (
      <div className="w-full py-3 flex gap-2 justify-center items-center bg-gray-100 dark:bg-graydark-50">
        <Text color="contrast" weight="medium">
          The V2 Hardfork update is now required on{' '}
          {isMainnet ? 'mainnet' : 'the zen network'}
        </Text>
        <LearnMore color={linkColor} />
      </div>
    )
  }

  return (
    <div className="w-full py-3 flex gap-2 justify-center items-center bg-gray-100 dark:bg-graydark-50">
      <Text color="contrast" weight="medium">
        V2 Hardfork {isRequireTimeActive ? 'is required' : 'activates'} on{' '}
        {isMainnet ? 'mainnet' : 'the zen network'} in {daysRemaining} days at
        block height {selectedHeight.toLocaleString()}
      </Text>
      <LearnMore color={linkColor} />
    </div>
  )
}
