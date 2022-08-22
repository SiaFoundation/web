import { MutableRefObject, useMemo } from 'react'
import { scaleTime, scaleLinear } from '@visx/scale'
import { PatternLines } from '@visx/pattern'
import { Brush } from '@visx/brush'
import { Bounds } from '@visx/brush/lib/types'
import BaseBrush from '@visx/brush/lib/BaseBrush'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Box } from '../../core/Box'
import { AreaChart } from '../ChartTimeValue/AreaChart'
import { Panel } from '../../core/Panel'
import { getDaysInMs } from '../../lib/time'

const accentColor = 'var(--colors-brandAccent9)'
const patternColor = 'var(--colors-brandAccent9)'

const margin = { top: 3, bottom: 3, left: 3, right: 3 }
const PATTERN_ID = 'brush_pattern'
const selectedBrushStyle = {
  fill: `url(#${PATTERN_ID})`,
  stroke: 'var(--colors-slate9)',
  strokeWidth: 2,
}

type OnBrushChange = ({ start, end }: { start: number; end: number }) => void

type ChartProps = {
  curve?: 'step' | 'monotone'
  start: number
  end: number
  width: number
  height: number
  onChange?: OnBrushChange
  brushRef?: MutableRefObject<BaseBrush>
}

function Chart({
  curve,
  start,
  end,
  width,
  height,
  onChange,
  brushRef,
}: ChartProps) {
  const onBrushChange = (domain: Bounds | null) => {
    if (!domain) return
    const { x0, x1 } = domain
    if (onChange) {
      onChange({ start: x0, end: x1 })
    }
  }

  // bounds
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // bounds
  const xMax = Math.max(innerWidth, 0)
  const yMax = Math.max(innerHeight, 0)

  const brushTimeScale = useMemo(() => {
    const now = new Date().getTime()
    const span = Math.max(end - start, getDaysInMs(7))
    const domainEnd = Math.min(end + span, now)
    const domainStart = end - span
    return scaleTime<number>({
      range: [0, xMax],
      domain: [new Date(domainStart), new Date(domainEnd)] as [Date, Date],
    })
  }, [xMax, start, end])
  const brushValueScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        domain: [0, 1],
        nice: true,
      }),
    [yMax]
  )

  const initialBrushPosition = useMemo(
    () => ({
      start: { x: start },
      end: { x: end },
    }),
    [start, end]
  )

  if (width < 10) return null

  return (
    <Box>
      <svg width={width} height={height}>
        <AreaChart
          // hideBottomAxis
          hideLeftAxis
          data={[]}
          width={width}
          yMax={0}
          xScale={brushTimeScale}
          yScale={brushValueScale}
          curve={curve}
          margin={margin}
          gradientColor={accentColor}
        >
          <PatternLines
            id={PATTERN_ID}
            height={8}
            width={8}
            stroke={patternColor}
            strokeWidth={3}
            orientation={['diagonal']}
          />
          <Brush
            xScale={brushTimeScale}
            yScale={brushValueScale}
            width={xMax}
            height={yMax}
            margin={margin}
            handleSize={8}
            innerRef={brushRef}
            resizeTriggerAreas={['left', 'right']}
            brushDirection="horizontal"
            initialBrushPosition={initialBrushPosition}
            onChange={onBrushChange}
            selectedBoxStyle={selectedBrushStyle}
            useWindowMoveEvents
          />
        </AreaChart>
      </svg>
    </Box>
  )
}

type Props = {
  start: number
  end: number
  height: number
  curve?: 'step' | 'monotone'
  onChange?: OnBrushChange
  brushRef?: MutableRefObject<BaseBrush>
}

export function ChartBrush({
  start,
  end,
  onChange,
  height,
  curve,
  brushRef,
}: Props) {
  return (
    <Panel css={{ width: '100%', height, padding: '1px' }}>
      <ParentSize>
        {({ width, height }) => (
          <Chart
            start={start}
            end={end}
            width={width}
            height={height}
            onChange={onChange}
            curve={curve}
            brushRef={brushRef}
          />
        )}
      </ParentSize>
    </Panel>
  )
}
