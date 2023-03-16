import { cx } from 'class-variance-authority'
import { blockHeightToTime, blocksToMilliseconds } from '../../lib/blockTime'
import { BlockLabel, DateLabel, RelativeLabel } from './Labels'

type Color = 'gray' | 'green' | 'amber' | 'blue'

type Props = {
  label: string
  bottomLabel?: string
  currentHeight: number
  eventHeight?: number
  range: {
    startHeight: number
    endHeight: number
  }
  color: Color
  className?: string
  unconfirmedPing?: boolean
}

export function Point({
  currentHeight,
  eventHeight,
  range,
  label,
  bottomLabel,
  color,
  className,
  unconfirmedPing = true,
}: Props) {
  const eventInFuture = eventHeight ? eventHeight > currentHeight : false
  const eventUnconfirmed =
    eventHeight && !eventInFuture && currentHeight - eventHeight < 6
  const spanHeight = range.endHeight - range.startHeight
  const spanTime = blocksToMilliseconds(spanHeight)

  const rangeStartTime = blockHeightToTime(currentHeight, range.startHeight)
  // const rangeEndTime = blockHeightToTime(currentHeight, range.endHeight)

  const eventTime = eventHeight
    ? blockHeightToTime(currentHeight, eventHeight)
    : 0

  const eventPos = eventTime ? (eventTime - rangeStartTime) / spanTime : 0

  if (!eventHeight) {
    return null
  }

  return (
    <div
      className={cx(
        'group',
        'absolute -top-[5px] w-4 h-4',
        'flex items-center justify-center',
        'rounded-full cursor-pointer',
        '-translate-x-1/2',
        className
      )}
      style={{
        left: toPercent(eventPos),
      }}
    >
      <div
        className={cx(
          'relative w-full h-full',
          'flex items-center justify-center',
          'rounded-full cursor-pointer'
        )}
      >
        {unconfirmedPing && eventUnconfirmed && (
          <div
            className={cx(
              'z-0 absolute w-1.5 h-1.5',
              'rounded-full',
              'bg-amber-500 dark:bg-amber-200',
              'animate-pingslow'
            )}
          />
        )}
        <div
          className={cx(
            'z-0 absolute w-4 h-4',
            'rounded-full',
            'group-hover:bg-blue-500/10 dark:group-hover:bg-blue-200/10'
          )}
        />
        <div
          className={cx(
            'absolute w-1.5 h-1.5',
            'rounded-full',
            'border',
            color === 'green'
              ? [
                  'bg-green-500 dark:bg-green-500',
                  'group-hover:bg-green-600 dark:group-hover:bg-green-600',
                  'border-white dark:border-white',
                ]
              : [],
            color === 'amber'
              ? [
                  'bg-amber-500 dark:bg-amber-500',
                  'group-hover:bg-amber-600 dark:group-hover:bg-amber-600',
                  'border-white dark:border-white',
                ]
              : [],
            color === 'gray'
              ? [
                  'bg-gray-700 dark:bg-graydark-900',
                  'group-hover:bg-gray-800 dark:group-hover:bg-graydark-800',
                  'border-white dark:border-white',
                ]
              : [],
            color === 'blue'
              ? [
                  'bg-blue-300 dark:bg-blue-300',
                  'group-hover:bg-blue-400 dark:group-hover:bg-blue-400',
                  'border-white dark:border-white',
                ]
              : []
          )}
        />
        <div className="hidden group-hover:flex absolute justify-between gap-1 bottom-[100%] left-1.5">
          <BlockLabel
            blockHeight={eventHeight}
            align="start"
            variant="primary"
          />
          <RelativeLabel variant="primary">{label}</RelativeLabel>
        </div>
        <div className="hidden group-hover:flex absolute justify-between gap-1 top-[100%] left-1.5">
          <DateLabel date={eventTime} align="start" variant="secondary" />
          {bottomLabel && (
            <RelativeLabel variant="secondary">{bottomLabel}</RelativeLabel>
          )}
        </div>
      </div>
    </div>
  )
}

function toPercent(frac: number) {
  return `${frac * 100}%`
}
