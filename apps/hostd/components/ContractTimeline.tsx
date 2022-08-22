import { Box, Flex, Text } from '@siafoundation/design-system'
import { format } from 'date-fns'

type Props = {
  start: number
  end: number
  payout: number
  range: {
    start: number
    end: number
  }
  color?: 'red' | 'yellow' | 'green'
}

const colorMap = {
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
    <Box
      css={{
        position: 'relative',
        width: '100%',
        padding: '$3',
      }}
    >
      <Box
        css={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '4px',
          borderRadius: '$pill',
        }}
      >
        {/* <DateLabel date={range.start} align="start" variant="secondary" />
        <DateLabel date={range.end} align="end" variant="secondary" /> */}
        <Flex
          css={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
          }}
        >
          <Flex
            justify="between"
            gap="1"
            css={{
              position: 'relative',
              left: 0,
              top: 0,
              width: '100%',
            }}
          >
            <DateLabel date={range.start} align="start" variant="secondary" />
            <DateLabel date={range.end} align="end" variant="secondary" />
          </Flex>
        </Flex>
        <Box
          css={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            background: '$gray4',
            borderRadius: '$pill',
          }}
        />
        <Flex
          justify="between"
          gap="1"
          css={{
            position: 'absolute',
            height: '100%',
            left: toPercent(startPos),
            width: toPercent(endPos - startPos),
            borderRadius: '$pill',
            background: colorMap[color] || '$slate10',
          }}
        >
          <DateLabel date={start} align="start" variant="primary" />
          <DateLabel date={end} align="end" variant="primary" />
        </Flex>
        <Box
          css={{
            position: 'absolute',
            left: toPercent(payoutPos),
            width: '4px',
            height: '4px',
            boxShadow: '0 0 10px 5px $colors$grass5',
            borderRadius: '$round',
            backgroundColor: '$grass11',
          }}
        >
          <DateLabel date={payout} align="start" variant="primary" />
        </Box>
      </Box>
      <Box
        css={{
          position: 'absolute',
          top: 0,
          left: toPercent(todayPos),
          width: '1px',
          height: '100%',
          background: '$slate7',
        }}
      />
    </Box>
  )
}

type RelativeLabelProps = {
  children: React.ReactNode
  align: 'start' | 'end'
  variant: 'primary' | 'secondary'
}

function RelativeLabel({ children, variant, align }: RelativeLabelProps) {
  return (
    <Box
      css={{
        position: 'relative',
        top: variant === 'primary' ? '-18px' : undefined,
        bottom: variant === 'secondary' ? '-5px' : undefined,
      }}
    >
      <Text
        size="10"
        css={{
          color: variant === 'primary' ? '$textContrast' : '$gray10',
          direction: align === 'start' ? 'rtl' : 'ltr',
        }}
        weight={variant === 'primary' ? 'semibold' : 'regular'}
        ellipsis
      >
        {children}
      </Text>
    </Box>
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
