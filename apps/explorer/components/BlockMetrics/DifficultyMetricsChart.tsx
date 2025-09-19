import { useMemo, useState } from 'react'
import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'
import { LinePath } from '@visx/shape'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { Grid } from '@visx/grid'

type IncludeZero = 'auto' | 'always' | 'never'
type YType = 'time' | 'hash'
type TimeUnit = 's' | 'm' | 'h'
type HoverPoint = { i: number; y: number } | null
type TooltipContext = {
  xScale: (n: number) => number
  yScale: (n: number) => number
  xForIndex: (i: number) => number
  innerW: number
  innerH: number
}

type Props = {
  values: number[]
  yType: YType
  timeUnit?: TimeUnit
  desiredXTicks?: number
  className?: string
  foregroundClassName?: string
  includeZero?: IncludeZero
  xFirstBlock: number
  blocksPerStep: number
}

type Pt = { i: number; y: number }

export function DifficultyMetricsChart({
  values,
  yType,
  timeUnit = 'm',
  desiredXTicks = 8,
  className,
  foregroundClassName = 'text-gray-1100 dark:text-white',
  includeZero = 'auto',
  xFirstBlock,
  blocksPerStep,
}: Props) {
  const W = 1000
  const H = 500

  const margin = { top: 8, right: 24, bottom: 56, left: 60 }
  const innerW = Math.max(0, W - margin.left - margin.right)
  const innerH = Math.max(0, H - margin.top - margin.bottom)

  const data: Pt[] = useMemo(() => {
    return (values ?? [])
      .map((n, i) => ({ i, y: n }))
      .filter((d) => Number.isFinite(d.y))
  }, [values])

  const yVals = data.map((d) => d.y)
  const rawMin = Math.min(...yVals)
  const rawMax = Math.max(...yVals)

  const [yDomainMin, yDomainMax] = useMemo<[number, number]>(
    () => computePaddedYDomain(rawMin, rawMax, includeZero),
    [rawMin, rawMax, includeZero],
  )

  // Match DifficultyMetrics API offset semantics
  const firstHeight =
    xFirstBlock > 0 && blocksPerStep > 1
      ? xFirstBlock + blocksPerStep
      : xFirstBlock

  const xDomain: [number, number] = [
    firstHeight,
    firstHeight + (data.length - 1) * blocksPerStep,
  ]

  const xScale = scaleLinear<number>({
    domain: xDomain,
    range: [0, innerW],
    nice: false,
  })

  const yScale = scaleLinear<number>({
    domain: [yDomainMin, yDomainMax],
    range: [innerH, 0],
    nice: false,
  })

  const xForIndex = (i: number) => firstHeight + i * blocksPerStep

  const maxAbsY = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax))
  const siPow3 = yType === 'hash' ? siScalePow3(maxAbsY) : 0
  const siSuffix = SI_HASH_SUFFIXES[siPow3]
  const siFactor = Math.pow(10, siPow3 * 3)

  const nsToUnit = (ns: number, u: TimeUnit) =>
    u === 's' ? ns / 1e9 : u === 'm' ? ns / 6e10 : ns / 3.6e12

  const yTickFormat = (v: number) => {
    if (yType === 'time') {
      return nsToUnit(v, timeUnit).toLocaleString(undefined, {
        maximumFractionDigits: 1,
      })
    }
    return `${formatSI(v / siFactor)}`
  }

  const yAxisLabel =
    yType === 'time'
      ? `Time (${timeUnit})`
      : siPow3 > 0
        ? `Difficulty (hashes/block)`
        : 'Difficulty'

  const baseXTicks = sampleAlignedTicks(
    data.length,
    desiredXTicks,
    firstHeight,
    blocksPerStep,
  )
  const xTicks = enforceMinPixelSpacingOnTicks(baseXTicks, xScale, 56)

  const showZeroLine = yDomainMin < 0 && yDomainMax > 0
  const zeroY = showZeroLine ? yScale(0) : null

  const [hover, setHover] = useState<HoverPoint>(null)
  const xText = hover ? xForIndex(hover.i).toLocaleString() : ''

  const formatYForTooltip = (y: number, i: number) => {
    if (yType === 'hash') {
      return `${formatSI(y / siFactor)}${siSuffix}`
    }
    const val = nsToUnit(y, timeUnit).toLocaleString(undefined, {
      maximumFractionDigits: 1,
    })
    return `${val}${timeUnit}`
  }

  const yText = hover ? formatYForTooltip(hover.y, hover.i) : ''
  const valueLabel = yType === 'hash' ? 'Difficulty' : 'Time'
  const tooltipLabel = hover ? `Block: ${xText}, ${valueLabel}: ${yText}` : ''

  if (!data.length || innerW <= 0 || innerH <= 0) {
    return (
      <svg
        className={className}
        width="100%"
        height="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x={12}
          y={20}
          fontSize={12}
          fill="currentColor"
          className={foregroundClassName}
        >
          No data
        </text>
      </svg>
    )
  }

  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-label="Metrics chart"
    >
      <Group left={margin.left} top={margin.top}>
        <Grid
          width={innerW}
          height={innerH}
          xScale={xScale}
          yScale={yScale}
          stroke="darkgrey"
        />

        <g className={foregroundClassName}>
          {showZeroLine && zeroY !== null && (
            <line
              x1={0}
              x2={innerW}
              y1={zeroY}
              y2={zeroY}
              stroke="currentColor"
              strokeOpacity={0.25}
              strokeDasharray="2,2"
            />
          )}

          <LinePath<Pt>
            data={data}
            x={(d) => xScale(xForIndex(d.i))}
            y={(d) => yScale(d.y)}
            stroke="currentColor"
            strokeWidth={2}
          />

          {data.map((d, i) => {
            const cx = xScale(xForIndex(i))
            const cy = yScale(d.y)
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r={2} fill="currentColor" />
                <circle
                  cx={cx}
                  cy={cy}
                  r={10}
                  fill="transparent"
                  stroke="transparent"
                  pointerEvents="all"
                  onMouseEnter={() => setHover({ i, y: d.y })}
                  onMouseMove={() => setHover({ i, y: d.y })}
                  onMouseLeave={() => setHover(null)}
                />
              </g>
            )
          })}

          {hover && (
            <circle
              cx={xScale(xForIndex(hover.i))}
              cy={yScale(hover.y)}
              r={5}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeOpacity={0.6}
              pointerEvents="none"
            />
          )}

          {renderTooltip(
            hover,
            { xScale, yScale, xForIndex, innerW, innerH },
            tooltipLabel,
          )}

          <AxisLeft
            scale={yScale}
            numTicks={5}
            // eslint-disable-next-line
            tickFormat={yTickFormat as any}
            tickLength={6}
            stroke="currentColor"
            tickStroke="currentColor"
            tickLabelProps={() => ({
              dx: -3,
              dy: 3,
              textAnchor: 'end',
              fontSize: 10,
              fill: 'currentColor',
            })}
            label={yAxisLabel}
            labelProps={{ fontSize: 12, fill: 'currentColor', y: -46 }}
          />

          <AxisBottom
            top={innerH}
            scale={xScale}
            tickValues={xTicks}
            tickFormat={(v) => Number(v).toLocaleString()}
            stroke="currentColor"
            tickStroke="currentColor"
            tickLabelProps={() => ({
              fontSize: 10,
              fill: 'currentColor',
              dx: 0,
              textAnchor: 'middle',
            })}
            label="Block height"
            labelProps={{ fill: 'currentColor' }}
          />
        </g>
      </Group>
    </svg>
  )
}

function renderTooltip(
  hover: HoverPoint,
  { xScale, yScale, xForIndex, innerW }: TooltipContext,
  tooltipLabel: string,
) {
  if (!hover) return null
  const fontSize = 14
  const charW = 7
  const padX = 10
  const padY = 10
  const boxW = Math.max(60, tooltipLabel.length * charW + padX * 2)
  const boxH = fontSize + padY * 2

  const px = xScale(xForIndex(hover.i))
  const py = yScale(hover.y)

  let tipX = px + 10
  let tipY = py - 10 - boxH
  if (tipX + boxW > innerW) tipX = px - 10 - boxW
  if (tipY < 0) tipY = py + 10

  return (
    <g transform={`translate(${tipX}, ${tipY})`} pointerEvents="none">
      <rect
        width={boxW}
        height={boxH}
        rx={4}
        fill="#ffffff"
        stroke="currentColor"
        strokeOpacity={0.25}
      />
      <text
        x={padX}
        y={padY + fontSize * 0.8}
        fontSize={fontSize}
        fill="#000000"
      >
        {tooltipLabel}
      </text>
    </g>
  )
}

function computePaddedYDomain(
  rawMin: number,
  rawMax: number,
  includeZero: IncludeZero,
): [number, number] {
  if (!Number.isFinite(rawMin) || !Number.isFinite(rawMax)) return [0, 1]

  if (rawMin === rawMax) {
    const baseline = Math.abs(rawMin) || 1
    const pad = baseline * 0.01
    if (includeZero === 'always' && rawMin >= 0) {
      return [0, rawMax + pad]
    }
    return [rawMin - pad, rawMax + pad]
  }

  const span = rawMax - rawMin
  const padTop = span * 0.01
  const padBottom = span * 0.01

  if (includeZero === 'never') {
    return [rawMin - padBottom, rawMax + padTop]
  }

  if (includeZero === 'always') {
    if (rawMin >= 0) return [0, rawMax + padTop]
    return [rawMin - padBottom, rawMax + padTop]
  }

  if (rawMin >= 0) {
    const closeToZero = rawMin <= span * 0.15
    const minDomain = closeToZero ? 0 : rawMin - padBottom
    return [minDomain, rawMax + padTop]
  }

  return [rawMin - padBottom, rawMax + padTop]
}

const SI_HASH_SUFFIXES = ['H', 'KH', 'MH', 'GH', 'TH', 'PH', 'EH', 'ZH', 'YH']

function siScalePow3(maxAbs: number) {
  if (!isFinite(maxAbs) || maxAbs <= 0) return 0
  const pow3 = Math.floor(Math.log10(maxAbs) / 3)
  return Math.max(0, Math.min(pow3, SI_HASH_SUFFIXES.length - 1))
}

function formatSI(n: number) {
  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  let v: number
  if (abs >= 100) v = Math.round(abs)
  else if (abs >= 10) v = round(abs, 1)
  else v = round(abs, 2)
  return `${sign}${v.toLocaleString()}`
}

function round(n: number, p = 0) {
  const m = Math.pow(10, p)
  return Math.round(n * m) / m
}

function niceSampleStride(raw: number) {
  const pow = Math.pow(10, Math.floor(Math.log10(raw || 1)))
  const rel = raw / pow
  const base = rel <= 1 ? 1 : rel <= 2 ? 2 : rel <= 3 ? 3 : rel <= 5 ? 5 : 10
  return Math.max(1, Math.round(base * pow))
}

function sampleAlignedTicks(
  sampleCount: number,
  desired = 6,
  startValue = 0,
  stepValue = 1,
): number[] {
  if (sampleCount <= 0) return []
  const rawStride = sampleCount / Math.max(1, desired - 1)
  const stride = niceSampleStride(rawStride)
  const ticks: number[] = []
  for (let i = 0; i < sampleCount; i += stride)
    ticks.push(startValue + i * stepValue)
  const last = startValue + (sampleCount - 1) * stepValue
  if (ticks[ticks.length - 1] !== last) ticks.push(last)
  return ticks
}

function enforceMinPixelSpacingOnTicks(
  ticks: number[],
  scale: (n: number) => number,
  minPx = 56,
): number[] {
  if (ticks.length <= 2) return ticks.slice()

  const kept: number[] = []
  let lastPx = scale(ticks[ticks.length - 1])
  kept.push(ticks[ticks.length - 1])

  for (let idx = ticks.length - 2; idx >= 1; idx--) {
    const t = ticks[idx]
    const px = scale(t)
    if (Math.abs(lastPx - px) >= minPx) {
      kept.push(t)
      lastPx = px
    }
  }

  const first = ticks[0]
  if (kept[kept.length - 1] !== first) kept.push(first)

  kept.sort((a, b) => a - b)
  return kept
}
