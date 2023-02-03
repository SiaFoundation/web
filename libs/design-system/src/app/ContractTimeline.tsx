import { Text } from '../core/Text'
import { format } from 'date-fns'
import { cx } from 'class-variance-authority'
import { blockHeightToTime, blocksToMilliseconds } from '../lib/blockTime'

type Color = 'red' | 'green' | 'amber'

type Props = {
  currentHeight: number
  startHeight: number
  endHeight?: number
  payoutHeight?: number
  range: {
    startHeight: number
    endHeight: number
  }
  color?: Color
}

const colorMap: Record<Color, string> = {
  red: 'bg-red-700',
  green: 'bg-green-700',
  amber: 'bg-amber-700',
}

export function ContractTimeline({
  currentHeight,
  startHeight,
  endHeight,
  payoutHeight,
  range,
  color,
}: Props) {
  const todayTime = new Date().getTime()
  const rangeStartTime = blockHeightToTime(currentHeight, range.startHeight)
  // const rangeEndTime = blockHeightToTime(currentHeight, range.endHeight)
  const startTime = blockHeightToTime(currentHeight, startHeight)
  const endTime = endHeight ? blockHeightToTime(currentHeight, endHeight) : 0
  const payoutTime = payoutHeight
    ? blockHeightToTime(currentHeight, payoutHeight)
    : 0

  const spanHeight = range.endHeight - range.startHeight
  const spanTime = blocksToMilliseconds(spanHeight)
  const startPos = (startTime - rangeStartTime) / spanTime
  const endPos = endTime ? (endTime - rangeStartTime) / spanTime : 0
  const payoutPos = payoutTime ? (payoutTime - rangeStartTime) / spanTime : 0
  const todayPos = (todayTime - rangeStartTime) / spanTime

  return (
    <div className="group relative w-full">
      <div className="relative py-6">
        <div className="relative z-10 h-1 rounded-lg">
          {/* <div className="absolute left-0 top-0 w-full">
            <div className="flex justify-between gap-2 relative top-0 left-0 w-full">
              <DateLabel
                date={rangeStartTime}
                align="start"
                variant="secondary"
              />
              <DateLabel date={rangeEndTime} align="end" variant="secondary" />
            </div>
          </div> */}
          <div className="absolute h-full w-full bg-gray-300 dark:bg-graydark-300" />
          <div
            className={cx(
              'flex justify-between gap-2 absolute h-full rounded-lg',
              color ? colorMap[color] : 'bg-gray-900 dark:bg-graydark-900'
            )}
            style={{
              left: toPercent(startPos),
              width: toPercent(endPos - startPos),
            }}
          >
            <DateLabel date={startTime} align="start" variant="primary" />
            <DateLabel date={endTime} align="end" variant="primary" />
          </div>
          <div
            className={cx(
              'flex justify-between gap-2 absolute h-full rounded-lg',
              color ? colorMap[color] : 'bg-gray-900 dark:bg-graydark-900'
            )}
            style={{
              left: toPercent(startPos),
              width: toPercent(endPos - startPos),
            }}
          >
            <BlockLabel
              blockHeight={startHeight}
              align="start"
              variant="secondary"
            />
            <BlockLabel
              blockHeight={endHeight}
              align="end"
              variant="secondary"
            />
          </div>
          {!!payoutTime && (
            <div
              className="absolute w-1 h-1 shadow shadow-green-500 dark:shadow-green-500 rounded bg-green-500 dark:bg-green-500"
              style={{
                left: toPercent(payoutPos),
              }}
            >
              <DateLabel date={payoutTime} align="start" variant="primary" />
            </div>
          )}
        </div>
        <div
          className="hidden group-hover:block absolute top-0 w-px h-full bg-gray-600 dark:bg-white/20"
          style={{
            left: `calc(${toPercent(todayPos)} + 1.5px)`,
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 z-10 w-1 h-1 rounded-full bg-gray-600 dark:bg-white"
          style={{
            left: toPercent(todayPos),
          }}
        />
      </div>
    </div>
  )
}

type RelativeLabelProps = {
  children: React.ReactNode
  align: 'start' | 'end'
  variant: 'primary' | 'secondary'
}

function RelativeLabel({ children, variant, align }: RelativeLabelProps) {
  return (
    <div
      className="relative"
      style={{
        top: variant === 'primary' ? '-18px' : undefined,
        bottom: variant === 'secondary' ? '-5px' : undefined,
        left: align === 'start' ? '0px' : undefined,
        right: align === 'end' ? '0px' : undefined,
      }}
    >
      <Text
        size="10"
        color={variant === 'primary' ? 'contrast' : 'verySubtle'}
        dir={align === 'start' ? 'rtl' : 'ltr'}
        weight={variant === 'primary' ? 'semibold' : 'regular'}
        ellipsis
      >
        {children}
      </Text>
    </div>
  )
}

type DateLabelProps = {
  date?: number
  align: 'start' | 'end'
  variant: 'primary' | 'secondary'
}

function DateLabel({ date, align, variant }: DateLabelProps) {
  return date ? (
    <RelativeLabel variant={variant} align={align}>
      {variant === 'primary'
        ? format(date, 'MMM d')
        : format(date, 'MMM d, yy')}
    </RelativeLabel>
  ) : null
}

type BlockLabelProps = {
  blockHeight?: number
  align: 'start' | 'end'
  variant: 'primary' | 'secondary'
}

function BlockLabel({ blockHeight, align, variant }: BlockLabelProps) {
  return blockHeight ? (
    <RelativeLabel variant={variant} align={align}>
      Block {blockHeight.toLocaleString()}
    </RelativeLabel>
  ) : null
}

function toPercent(frac: number) {
  return `${frac * 100}%`
}
