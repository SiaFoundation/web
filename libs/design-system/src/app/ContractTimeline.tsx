import { Text } from '../core/Text'
import { format } from 'date-fns'

type Color = 'red' | 'green' | 'yellow'

type Props = {
  start: number
  end: number
  payout: number
  range: {
    start: number
    end: number
  }
  color?: Color
}

const colorMap: Record<Color, string> = {
  red: '$red9',
  green: '$green9',
  yellow: '$amber9',
}

export function ContractTimeline({ start, end, payout, range, color }: Props) {
  const today = new Date().getTime()
  const span = range.end - range.start
  const startPos = (start - range.start) / span
  const endPos = (end - range.start) / span
  const payoutPos = (payout - range.start) / span
  const todayPos = (today - range.start) / span
  return (
    <div className="relative w-full p-6">
      <div className="relative z-10 w-full h-1 rounded-lg">
        {/* <DateLabel date={range.start} align="start" variant="secondary" />
        <DateLabel date={range.end} align="end" variant="secondary" /> */}
        <div className="absolute left-0 top-0 w-full">
          <div className="flex justify-between gap-2 relative top-0 left-0 w-full">
            <DateLabel date={range.start} align="start" variant="secondary" />
            <DateLabel date={range.end} align="end" variant="secondary" />
          </div>
        </div>
        <div className="absolute h-full w-full bg-gray-300 dark:bg-graydark-300" />
        <div
          className="flex justify-between gap-2 absolute h-full rounded-lg bg-gray-900 dark:bg-graydark-900"
          style={{
            left: toPercent(startPos),
            width: toPercent(endPos - startPos),
            background: color ? colorMap[color] : undefined,
          }}
        >
          <DateLabel date={start} align="start" variant="primary" />
          <DateLabel date={end} align="end" variant="primary" />
        </div>
        <div
          className="absolute w-1 h-1 shadow shadow-green-500 dark:shadow-green-500 rounded bg-green-500 dark:bg-green-500"
          style={{
            left: toPercent(payoutPos),
          }}
        >
          <DateLabel date={payout} align="start" variant="primary" />
        </div>
      </div>
      <div
        className="absolute top-0 w-px h-full bg-gray-600 dark:bg-graydark-600"
        style={{
          left: toPercent(todayPos),
        }}
      />
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
      className="realtive"
      style={{
        top: variant === 'primary' ? '-18px' : undefined,
        bottom: variant === 'secondary' ? '-5px' : undefined,
      }}
    >
      <Text
        size="10"
        color={variant === 'primary' ? 'contrast' : 'subtle'}
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
  date: number
  align: 'start' | 'end'
  variant: 'primary' | 'secondary'
}

function DateLabel({ date, align, variant }: DateLabelProps) {
  return (
    <RelativeLabel variant={variant} align={align}>
      {variant === 'primary'
        ? format(date, 'MMM d')
        : format(date, 'MMM d, yy')}
    </RelativeLabel>
  )
}

function toPercent(frac: number) {
  return `${frac * 100}%`
}
