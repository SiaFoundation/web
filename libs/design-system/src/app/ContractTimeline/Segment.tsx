import { cx } from 'class-variance-authority'
import { blockHeightToTime, blocksToMilliseconds } from '../../lib/blockTime'
import { BlockLabel, DateLabel, RelativeLabel } from './Labels'

type Color = 'blue' | 'green' | 'amber'

type Props = {
  label: string
  currentHeight: number
  startHeight: number
  endHeight: number
  range: {
    startHeight: number
    endHeight: number
  }
  color: Color
  align: 'center' | 'start' | 'end'
  rounded: 'all' | 'start' | 'end'
  className?: string
  showDates?: boolean
}

export function Segment({
  label,
  currentHeight,
  range,
  startHeight,
  endHeight,
  color,
  align,
  rounded,
  className,
  showDates,
}: Props) {
  if (!startHeight || !endHeight) {
    return null
  }

  const spanHeight = range.endHeight - range.startHeight
  const spanTime = blocksToMilliseconds(spanHeight)

  const rangeStartTime = blockHeightToTime(currentHeight, range.startHeight)
  // const rangeEndTime = blockHeightToTime(currentHeight, range.endHeight)

  const timeStart = blockHeightToTime(currentHeight, startHeight)
  const timeEnd = blockHeightToTime(currentHeight, endHeight)

  const posStart = (timeStart - rangeStartTime) / spanTime
  const posEnd = (timeEnd - rangeStartTime) / spanTime

  return (
    <div
      className={cx(
        'group flex items-center justify-center',
        'absolute -top-[5px] h-4',
        'cursor-pointer',
        'transition-colors'
      )}
      style={{
        left: toPercent(posStart),
        width: toPercent(posEnd - posStart),
      }}
    >
      <div
        className={cx(
          'z-0 absolute w-full h-full',
          'rounded-md',
          'group-hover:bg-blue-500/10 dark:group-hover:bg-blue-200/10'
        )}
        style={{
          width: 'calc(100% + 8px)',
          left: '-4px',
        }}
      />
      <div
        className={cx(
          'z-10 absolute w-full h-1.5',
          className,
          rounded === 'start'
            ? 'rounded-l-lg'
            : rounded === 'end'
            ? 'rounded-r-lg'
            : 'rounded-lg',
          'border-y',
          rounded === 'start'
            ? 'border-l'
            : rounded === 'end'
            ? 'border-r'
            : 'border',
          color === 'blue'
            ? [
                'bg-blue-300 dark:bg-blue-300',
                'group-hover:bg-blue-400 dark:group-hover:bg-blue-400',
                'border-blue-500/50 dark:border-blue-500/50',
              ]
            : [],
          color === 'green'
            ? [
                'bg-green-300 dark:bg-green-300',
                'group-hover:bg-green-400 dark:group-hover:bg-green-400',
                'border-green-500/50 dark:border-green-500/50',
              ]
            : [],
          color === 'amber'
            ? [
                'bg-amber-300 dark:bg-amber-300',
                'group-hover:bg-amber-400 dark:group-hover:bg-amber-400',
                'border-amber-500/50 dark:border-amber-500/50',
              ]
            : []
        )}
      />
      <div
        className="hidden group-hover:flex absolute justify-between gap-2 bottom-[100%]"
        style={
          align === 'center'
            ? {
                width: '100%',
              }
            : align === 'end'
            ? {
                right: toPercent(1 - posEnd),
              }
            : {
                left: toPercent(posStart),
              }
        }
      >
        <BlockLabel blockHeight={startHeight} align="start" variant="primary" />
        <RelativeLabel variant="primary">{label}</RelativeLabel>
        <BlockLabel blockHeight={endHeight} align="end" variant="primary" />
      </div>
      {showDates && (
        <div
          className="flex group-hover/segments:hidden absolute justify-between gap-2 top-[100%]"
          style={
            align === 'center'
              ? {
                  width: '100%',
                }
              : align === 'end'
              ? {
                  right: toPercent(1 - posEnd),
                }
              : {
                  left: toPercent(posStart),
                }
          }
        >
          <DateLabel date={timeStart} align="start" variant="secondary" />
          <DateLabel date={timeEnd} align="start" variant="secondary" />
        </div>
      )}
      <div
        className="hidden group-hover:flex absolute justify-between gap-2 top-[100%]"
        style={
          align === 'center'
            ? {
                width: '100%',
              }
            : align === 'end'
            ? {
                right: toPercent(1 - posEnd),
              }
            : {
                left: toPercent(posStart),
              }
        }
      >
        <DateLabel date={timeStart} align="start" variant="secondary" />
        <DateLabel date={timeEnd} align="start" variant="secondary" />
      </div>
    </div>
  )
}

function toPercent(frac: number) {
  return `${frac * 100}%`
}
