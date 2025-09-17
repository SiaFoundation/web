import { useMemo, useState, useRef, useCallback } from 'react'
import clsx from 'clsx'
import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'
import { LinePath } from '@visx/shape'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { Grid } from '@visx/grid'
import { Button, Text, Tooltip } from '@siafoundation/design-system'
import { ArrowLeft16, ArrowRight16 } from '@siafoundation/react-icons'

type HoverPoint = { i: number; y: number } | null
type IncludeZero = 'auto' | 'always' | 'never'
type TimeUnit = 's' | 'm' | 'h'
type TooltipContext = {
  xScale: (n: number) => number
  yScale: (n: number) => number
  xForIndex: (i: number) => number
  innerW: number
}
type YType = 'time' | 'hash'

type Props = {
  values: number[]
  yType: YType
  xFirstBlock: number
  blocksPerStep: number
  timeUnit?: TimeUnit
  desiredXTicks?: number
  className?: string
  foregroundClassName?: string
  includeZero?: IncludeZero
  onSelectRange?: (startHeight: number, endHeight: number) => void
  onReset?: () => void
  onPanBlocks?: (direction: 'earlier' | 'later') => void
}

type Pt = { i: number; y: number }

export function DifficultyMetricsChart({
  values,
  yType,
  xFirstBlock,
  blocksPerStep,
  timeUnit = 'm',
  desiredXTicks = 8,
  className,
  foregroundClassName = 'text-gray-1100 dark:text-white',
  includeZero = 'auto',
  onSelectRange,
  onReset,
  onPanBlocks,
}: Props) {
  const [hover, setHover] = useState<HoverPoint>(null)
  const [cursorPx, setCursorPx] = useState<number | null>(null)
  const [dragStartPx, setDragStartPx] = useState<number | null>(null)
  const [dragCurrPx, setDragCurrPx] = useState<number | null>(null)
  const rectLeftRef = useRef<number>(0)

  const W = 1000
  const H = 600
  const margin = { top: 8, right: 24, bottom: 56, left: 60 }
  const innerW = Math.max(0, W - margin.left - margin.right)
  const innerH = Math.max(0, H - margin.top - margin.bottom)

  const data: Pt[] = useMemo(
    () =>
      (values ?? [])
        .map((n, i) => ({ i, y: n }))
        .filter((d) => Number.isFinite(d.y)),
    [values],
  )

  const yVals = useMemo(() => data.map((d) => d.y), [data])
  const rawMin = Math.min(...yVals)
  const rawMax = Math.max(...yVals)

  const anyControls = !!(onReset || onPanBlocks)

  const [baseYMin, baseYMax] = useMemo<[number, number]>(
    () => computePaddedYDomain(rawMin, rawMax, includeZero),
    [rawMin, rawMax, includeZero],
  )

  const [yDomainMin, yDomainMax] = useMemo<[number, number]>(() => {
    if (!Number.isFinite(baseYMin) || !Number.isFinite(baseYMax)) return [0, 1]
    if (!anyControls) return [baseYMin, baseYMax]
    const span = baseYMax - baseYMin || Math.abs(baseYMax) || 1
    return [baseYMin, baseYMax + span * 0.06]
  }, [baseYMin, baseYMax, anyControls])

  // This handles what may be a bug on the backend.
  const firstHeight =
    xFirstBlock > 0 && blocksPerStep > 1
      ? xFirstBlock + blocksPerStep
      : xFirstBlock

  const xDomain = useMemo<[number, number]>(() => {
    const min = firstHeight
    const max = firstHeight + (data.length - 1) * blocksPerStep
    return [min, max]
  }, [firstHeight, data.length, blocksPerStep])

  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: xDomain,
        range: [0, innerW],
        nice: false,
      }),
    [xDomain, innerW],
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [yDomainMin, yDomainMax],
        range: [innerH, 0],
        nice: false,
      }),
    [yDomainMin, yDomainMax, innerH],
  )

  const xGeom = useMemo(() => {
    const invStep = blocksPerStep > 0 ? 1 / blocksPerStep : 0
    const clampHeight = (h: number) =>
      Math.max(xDomain[0], Math.min(xDomain[1], h))

    const indexToHeight = (i: number) => firstHeight + i * blocksPerStep
    const heightToIndex = (h: number) => {
      const i = Math.round((h - firstHeight) * invStep)
      return Math.max(0, Math.min(data.length - 1, i))
    }
    const pxToHeight = (px: number) => xScale.invert(px)
    const snapHeight = (h: number) =>
      clampHeight(indexToHeight(heightToIndex(h)))

    return { indexToHeight, heightToIndex, pxToHeight, snapHeight }
  }, [blocksPerStep, firstHeight, xDomain, xScale, data.length])

  const xForIndex = useCallback((i: number) => xGeom.indexToHeight(i), [xGeom])

  const { siPow3, siSuffix, siFactor } = useMemo(() => {
    if (yType !== 'hash')
      return { siPow3: 0, siSuffix: SI_HASH_SUFFIXES[0], siFactor: 1 }
    const m = Math.max(Math.abs(baseYMin), Math.abs(baseYMax))
    const p = siScalePow3(m)
    return {
      siPow3: p,
      siSuffix: SI_HASH_SUFFIXES[p],
      siFactor: Math.pow(10, p * 3),
    }
  }, [yType, baseYMin, baseYMax])

  const nsToUnit = useCallback((ns: number, u: TimeUnit) => {
    return u === 's' ? ns / 1e9 : u === 'm' ? ns / 6e10 : ns / 3.6e12
  }, [])

  const yFmt = useMemo(() => {
    const format = (v: number) => {
      if (yType === 'time') {
        return nsToUnit(v, timeUnit).toLocaleString(undefined, {
          maximumFractionDigits: 1,
        })
      }
      return `${formatSI(v / siFactor)}`
    }
    const axis = (v: unknown) => format(Number(v))
    const label =
      yType === 'time'
        ? `Time (${timeUnit})`
        : siPow3 > 0
          ? 'Difficulty (hashes/block)'
          : 'Difficulty'
    return { format, axis, label }
  }, [yType, timeUnit, nsToUnit, siFactor, siPow3])

  const xTicks = useMemo(() => {
    const base = sampleAlignedTicks(
      data.length,
      desiredXTicks,
      firstHeight,
      blocksPerStep,
    )
    return enforceMinPixelSpacingOnTicks(base, xScale, 56)
  }, [data.length, desiredXTicks, firstHeight, blocksPerStep, xScale])

  const zeroLineY = useMemo(() => {
    if (yDomainMin < 0 && yDomainMax > 0) return yScale(0)
    return null
  }, [yDomainMin, yDomainMax, yScale])

  const clampedPx = useCallback(
    (e: React.PointerEvent<SVGRectElement>) =>
      Math.max(0, Math.min(innerW, e.clientX - rectLeftRef.current)),
    [innerW],
  )

  const updateRectLeft = useCallback((el: SVGRectElement | null) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    rectLeftRef.current = rect.left
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      const px = clampedPx(e)
      setCursorPx(px)
      if (dragStartPx !== null) setDragCurrPx(px)
      const i = xGeom.heightToIndex(xGeom.pxToHeight(px))
      const d = data[i]
      setHover(d ? { i, y: d.y } : null)
    },
    [clampedPx, dragStartPx, xGeom, data],
  )

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      updateRectLeft(e.currentTarget as SVGRectElement)
    },
    [updateRectLeft],
  )

  const handlePointerLeave = useCallback(() => {
    setCursorPx(null)
    if (dragStartPx === null) setHover(null)
  }, [dragStartPx])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      updateRectLeft(e.currentTarget as SVGRectElement)
      const px = clampedPx(e)
      setDragStartPx(px)
      setDragCurrPx(px)
      ;(e.currentTarget as SVGRectElement).setPointerCapture(e.pointerId)
    },
    [clampedPx, updateRectLeft],
  )

  const handlePointerUp = useCallback(() => {
    if (dragStartPx !== null && dragCurrPx !== null && onSelectRange) {
      const h1 = xGeom.snapHeight(xGeom.pxToHeight(dragStartPx))
      const h2 = xGeom.snapHeight(xGeom.pxToHeight(dragCurrPx))
      const start = Math.min(h1, h2)
      const end = Math.max(h1, h2)
      if (end - start >= blocksPerStep) onSelectRange(start, end)
    }
    setDragStartPx(null)
    setDragCurrPx(null)
  }, [dragStartPx, dragCurrPx, onSelectRange, xGeom, blocksPerStep])

  const handleDoubleClick = useCallback(() => {
    if (onReset) onReset()
  }, [onReset])

  const tooltipLabel = useMemo(() => {
    if (!hover) return ''
    const xText = xForIndex(hover.i).toLocaleString()
    const val =
      yType === 'hash'
        ? `${yFmt.format(hover.y)}${siSuffix}`
        : `${yFmt.format(hover.y)}${timeUnit}`
    const valueLabel = yType === 'hash' ? 'Difficulty' : 'Time'
    return `Block: ${xText}, ${valueLabel}: ${val}`
  }, [hover, xForIndex, yType, yFmt, siSuffix, timeUnit])

  if (!data.length || innerW <= 0 || innerH <= 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Text color="subtle">No data found</Text>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <svg
        className={clsx('block', className)}
        width="100%"
        height="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-label="Metrics chart"
      >
        <Group left={margin.left} top={margin.top}>
          <rect
            x={0}
            y={0}
            width={innerW}
            height={innerH}
            fill="transparent"
            pointerEvents="all"
            className="cursor-none touch-none"
            onPointerEnter={handlePointerEnter}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onDoubleClick={handleDoubleClick}
          />

          <g pointerEvents="none">
            <Grid
              width={innerW}
              height={innerH}
              xScale={xScale}
              yScale={yScale}
              stroke="darkgrey"
            />
          </g>

          <g className={foregroundClassName} pointerEvents="none">
            {zeroLineY !== null && (
              <line
                x1={0}
                x2={innerW}
                y1={zeroLineY}
                y2={zeroLineY}
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
                <circle key={i} cx={cx} cy={cy} r={2} fill="currentColor" />
              )
            })}

            {dragStartPx !== null && dragCurrPx !== null && (
              <rect
                x={Math.min(dragStartPx, dragCurrPx)}
                y={0}
                width={Math.abs(dragCurrPx - dragStartPx)}
                height={innerH}
                fill="currentColor"
                fillOpacity={0.08}
                stroke="currentColor"
                strokeOpacity={0.2}
              />
            )}

            {cursorPx !== null && (
              <line
                x1={cursorPx}
                x2={cursorPx}
                y1={0}
                y2={innerH}
                stroke="currentColor"
                strokeOpacity={0.5}
                strokeDasharray="3,3"
                shapeRendering="crispEdges"
              />
            )}

            {hover && (
              <circle
                cx={xScale(xForIndex(hover.i))}
                cy={yScale(hover.y)}
                r={5}
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                strokeOpacity={0.6}
              />
            )}

            {renderTooltip(
              hover,
              { xScale, yScale, xForIndex, innerW },
              tooltipLabel,
            )}

            <AxisLeft
              scale={yScale}
              numTicks={5}
              // eslint-disable-next-line
              tickFormat={yFmt.axis as any}
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
              label={yFmt.label}
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

      {(onReset || onPanBlocks) && (
        <div
          className="absolute top-1 right-1 flex items-center gap-2"
          role="group"
          aria-label="Chart controls"
          aria-keyshortcuts="ArrowLeft, ArrowRight"
        >
          {onPanBlocks && (
            <>
              <Tooltip content="Requests a previous set of blocks with the same length as your current view, if possible. Hotkey: left arrow">
                <Button
                  variant="gray"
                  size="small"
                  onClick={() => onPanBlocks('earlier')}
                  aria-label="Show earlier blocks"
                  title="Show earlier blocks (←)"
                >
                  <ArrowLeft16 />
                </Button>
              </Tooltip>
              <Tooltip content="Requests a future set of blocks with the same length as your current view, if possible. Hotkey: right arrow">
                <Button
                  variant="gray"
                  size="small"
                  onClick={() => onPanBlocks('later')}
                  aria-label="Show later blocks"
                  title="Show later blocks (→)"
                >
                  <ArrowRight16 />
                </Button>
              </Tooltip>
            </>
          )}
          {onReset && (
            <Tooltip content="Resets the view starting from block 1 to the most current tip. Double-click does the same">
              <Button
                variant="gray"
                size="small"
                onClick={onReset}
                aria-label="Reset view"
                title="Reset view (double-click chart)"
              >
                Reset
              </Button>
            </Tooltip>
          )}
        </div>
      )}
    </div>
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
  else if (abs >= 10) v = Math.round(abs * 10) / 10
  else v = Math.round(abs * 100) / 100
  return `${sign}${v.toLocaleString()}`
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
