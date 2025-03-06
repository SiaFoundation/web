import { Heading } from '@siafoundation/design-system'
import { HardforkCountdownItem } from './HardforkCountdownItem'
import { ContentLayout } from '../ContentLayout'
import clsx from 'clsx'

export function HardforkCountdown({ network }: { network: string }) {
  const allowHeight = network === 'mainnet' ? '526,000' : '112,000'
  const allowTime =
    network === 'mainnet'
      ? '2025-06-06T02:00:00.000Z'
      : '2025-03-01T07:00:00.000Z'

  const requireHeight = network === 'mainnet' ? '530,000' : '114,000'
  const requireTime =
    network === 'mainnet'
      ? '2025-07-04T02:00:00.000Z'
      : '2025-03-15T06:00:00.000Z'

  const buttonColor =
    network === 'mainnet'
      ? 'bg-green-500 dark:bg-green-400'
      : 'bg-amber-500 dark:bg-amber-400'
  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-10">
          <div className="flex justify-between">
            <Heading size="20" font="mono" ellipsis>
              v2 Hardfork Countdown
            </Heading>
            <a
              href="https://docs.sia.tech/navigating-the-v2-hardfork/v2"
              target="_blank"
              rel="noreferrer"
              className={clsx(
                'rounded py-0 px-2 inline-block font-sans text-white dark:text-graydark-50',
                'font-normal text-sm inline-flex items-center gap-1 cursor-pointer',
                buttonColor
              )}
            >
              Learn more
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-12">
            <HardforkCountdownItem
              title="Allow"
              blockHeight={allowHeight}
              date={allowTime}
            />
            <HardforkCountdownItem
              title="Require"
              blockHeight={requireHeight}
              date={requireTime}
            />
          </div>
        </div>
      }
    />
  )
}
