import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react'
import { Line, Bar } from '@visx/shape'
import { GridColumns, GridRows } from '@visx/grid'
import { scaleTime, scaleLinear } from '@visx/scale'
import { PatternLines } from '@visx/pattern'
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
} from '@visx/tooltip'
import { Brush } from '@visx/brush'
import { Bounds } from '@visx/brush/lib/types'
import BaseBrush, {
  BaseBrushState,
  UpdateBrush,
} from '@visx/brush/lib/BaseBrush'
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'
import { localPoint } from '@visx/event'
import { LinearGradient } from '@visx/gradient'
import { max, extent, bisector, min } from 'd3-array'
import { timeFormat } from 'd3-time-format'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import {
  Box,
  Button,
  Close24,
  Flex,
  Reset24,
  Text,
  Tooltip as DsTooltip,
} from '@siafoundation/design-system'
import { throttle } from 'lodash'
import AreaChart from './AreaChart'
import { humanNumber } from '@siafoundation/sia-js'

const background = 'var(--colors-panel)'
// export const background = 'transparent'
const background2 = 'var(--colors-panel)'
const accentColor = 'var(--colors-brandAccent9)'
const lineColor = 'var(--colors-hiContrast)'
const borderColor = 'var(--colors-gray4)'
const tooltipStyles = {
  ...defaultStyles,
  background: 'var(--colors-panel)',
  boxShadow: 'var(--colors-borderActive)',
  fontFamily: 'var(--fonts-sans)',
  color: 'var(--colors-hiContrast)',
}

const brushMargin = { top: 10, bottom: 15, left: 10, right: 10 }
const chartSeparation = 30
const PATTERN_ID = 'brush_pattern'
const GRADIENT_ID = 'brush_gradient'
const selectedBrushStyle = {
  fill: `url(#${PATTERN_ID})`,
  stroke: 'var(--colors-hiContrast)',
}

const throttled = throttle((func: () => void) => func(), 15)

// util
const formatDate = timeFormat("%b %d, '%y")

// accessors
export const getPointTime = (d: Point) => new Date(d?.timestamp || 0)
export const getPointValue = (d: Point) => d?.value || 0
const bisectDate = bisector<Point, Date>(
  (d) => new Date(d?.timestamp || 0)
).left

export type Point = {
  timestamp: number
  value: number
}

export type ChartProps = {
  compact?: boolean
  datasets: Dataset[]
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

type TooltipData = Point

const Chart = withTooltip<ChartProps, TooltipData>(
  ({
    compact = false,
    datasets,
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: ChartProps & WithTooltipProvidedProps<TooltipData>) => {
    const [selectedDatasetName, setSelectedDatasetName] = useState<string>(
      datasets[0]?.name
    )

    const dataset = useMemo(() => {
      const selectedDataset = datasets.find(
        (d) => d.name === selectedDatasetName
      )
      if (!selectedDataset) {
        return []
      }
      if (selectedDataset.dataset.length > 1) {
        return selectedDataset.dataset
      }
      const paddedDataset = []
      const startTime = selectedDataset.dataset.length
        ? selectedDataset.dataset[0].timestamp
        : new Date().getTime()
      const lastValue = selectedDataset.dataset.length
        ? selectedDataset.dataset[selectedDataset.dataset.length - 1].value
        : 0
      const oneDay = 1000 * 60 * 60 * 24
      paddedDataset.push({ timestamp: startTime - oneDay, value: 0 })
      paddedDataset.push(...selectedDataset.dataset)
      paddedDataset.push({
        timestamp: new Date().getTime(),
        value: lastValue,
      })
      return paddedDataset
    }, [datasets, selectedDatasetName])

    const brushRef = useRef<BaseBrush | null>(null)
    const [filteredDataset, setFilteredDataset] = useState(dataset)

    useEffect(() => {
      setFilteredDataset(dataset)
    }, [dataset])

    const onBrushChange = (domain: Bounds | null) => {
      if (!domain) return
      const { x0, x1, y0, y1 } = domain
      const datasetCopy = dataset.filter((s) => {
        const x = getPointTime(s).getTime()
        const y = getPointValue(s)
        return x > x0 && x < x1 && y > y0 && y < y1
      })
      setFilteredDataset(datasetCopy)
    }

    // bounds
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const topChartBottomMargin = compact
      ? chartSeparation / 2
      : chartSeparation + 10
    const topChartHeight = 0.8 * innerHeight - topChartBottomMargin
    const bottomChartHeight = innerHeight - topChartHeight - chartSeparation

    // bounds
    const xMax = Math.max(width - margin.left - margin.right, 0)
    const yMax = Math.max(topChartHeight, 0)
    const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0)
    const yBrushMax = Math.max(
      bottomChartHeight - brushMargin.top - brushMargin.bottom,
      0
    )

    // scales
    const timeScale = useMemo(
      () =>
        scaleTime({
          // range: [margin.left, innerWidth + margin.left],
          range: [0, xMax],
          domain: extent(filteredDataset, getPointTime) as [Date, Date],
        }),
      [xMax, filteredDataset]
    )
    const valueScale = useMemo(
      () =>
        scaleLinear<number>({
          // range: [innerHeight + margin.top, margin.top],
          range: [yMax, 0],
          domain: [
            min(filteredDataset, getPointValue),
            max(filteredDataset, getPointValue) > 0
              ? max(filteredDataset, getPointValue) * 1.01
              : 1,
          ],
          nice: true,
        }),
      [yMax, filteredDataset]
    )
    const brushTimeScale = useMemo(
      () =>
        scaleTime<number>({
          range: [0, xBrushMax],
          domain: extent(dataset, getPointTime) as [Date, Date],
        }),
      [dataset, xBrushMax]
    )
    const brushValueScale = useMemo(
      () =>
        scaleLinear({
          range: [yBrushMax, 0],
          domain: [0, max(dataset, getPointValue) || 0],
          nice: true,
        }),
      [dataset, yBrushMax]
    )

    const initialBrushPosition = useMemo(
      () => ({
        start: { x: brushTimeScale(getPointTime(dataset[0])) },
        end: { x: brushTimeScale(getPointTime(dataset[dataset.length - 1])) },
      }),
      [dataset, brushTimeScale]
    )

    // event handlers
    const handleClearClick = () => {
      if (brushRef?.current) {
        setFilteredDataset(dataset)
        brushRef.current.reset()
      }
    }

    const handleResetClick = () => {
      if (brushRef?.current) {
        const updater: UpdateBrush = (prevBrush) => {
          const newExtent = brushRef.current.getExtent(
            initialBrushPosition.start,
            initialBrushPosition.end
          )

          const newState: BaseBrushState = {
            ...prevBrush,
            start: { y: newExtent.y0, x: newExtent.x0 },
            end: { y: newExtent.y1, x: newExtent.x1 },
            extent: newExtent,
          }

          return newState
        }
        brushRef.current.updateBrush(updater)
      }
    }

    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        throttled(() => {
          const { x } = localPoint(event) || { x: 0 }
          const x0 = timeScale.invert(x)
          const index = bisectDate(filteredDataset, x0, 1)
          const d0 = filteredDataset[index - 1]
          const d1 = filteredDataset[index]
          let d = d0
          if (d1 && getPointTime(d1)) {
            d =
              x0.valueOf() - getPointTime(d0).valueOf() >
              getPointTime(d1).valueOf() - x0.valueOf()
                ? d1
                : d0
          }
          showTooltip({
            tooltipData: d,
            tooltipLeft: x,
            tooltipTop: valueScale(getPointValue(d)),
          })
        })
      },
      [showTooltip, valueScale, timeScale, filteredDataset]
    )
    if (width < 10) return null

    return (
      <Box css={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <LinearGradient
            id={GRADIENT_ID}
            from={background}
            to={background2}
            rotate={45}
          />
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={`url(#${GRADIENT_ID})`}
            rx={8}
          />
          <GridRows
            left={margin.left}
            scale={valueScale}
            width={innerWidth}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0}
            pointerEvents="none"
          />
          <GridColumns
            top={margin.top}
            scale={timeScale}
            height={innerHeight}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0.2}
            pointerEvents="none"
          />
          <AreaChart
            hideLeftAxis
            data={filteredDataset}
            // x={(d) => timeScale(getDate(d)) ?? 0}
            // y={(d) => valueScale(getBalance(d)) ?? 0}
            margin={{ ...margin, bottom: topChartBottomMargin }}
            xScale={timeScale}
            yScale={valueScale}
            // strokeWidth={1}
            // stroke="url(#area-gradient)"
            // fill="url(#area-gradient)"
            // curve={curveMonotoneX}
            width={width}
            yMax={yMax}
            gradientColor={accentColor}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          <AreaChart
            hideBottomAxis
            hideLeftAxis
            data={dataset}
            width={width}
            yMax={yBrushMax}
            xScale={brushTimeScale}
            yScale={brushValueScale}
            margin={brushMargin}
            top={topChartHeight + topChartBottomMargin + margin.top}
            gradientColor={accentColor}
          >
            <PatternLines
              id={PATTERN_ID}
              height={8}
              width={8}
              stroke={accentColor}
              strokeWidth={1}
              orientation={['diagonal']}
            />
            <Brush
              xScale={brushTimeScale}
              yScale={brushValueScale}
              width={xBrushMax}
              height={yBrushMax}
              margin={brushMargin}
              handleSize={8}
              innerRef={brushRef}
              resizeTriggerAreas={['left', 'right']}
              brushDirection="horizontal"
              initialBrushPosition={initialBrushPosition}
              onChange={onBrushChange}
              onClick={() => setFilteredDataset(dataset)}
              selectedBoxStyle={selectedBrushStyle}
              useWindowMoveEvents
            />
          </AreaChart>
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: topChartHeight }}
                stroke={lineColor}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={lineColor}
                stroke={borderColor}
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <Box>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={tooltipStyles}
            >
              {humanNumber(getPointValue(tooltipData), {
                fixed: 4,
                units: 'SC',
              })}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft}
              style={{
                ...tooltipStyles,
                minWidth: 72,
                textAlign: 'center',
                transform: 'translateX(-50%)',
              }}
            >
              <Text>{formatDate(getPointTime(tooltipData))}</Text>
            </Tooltip>
          </Box>
        )}
        <Flex gap="1" css={{ position: 'absolute', top: '$1-5', left: '$1-5' }}>
          {datasets.map(({ name }) => (
            <DsTooltip key={name} content={`Select ${name} dataset`}>
              <Button
                variant={name === selectedDatasetName ? 'accent' : 'gray'}
                onClick={() => setSelectedDatasetName(name)}
              >
                {name}
              </Button>
            </DsTooltip>
          ))}
        </Flex>
        <Flex
          gap="1"
          css={{ position: 'absolute', top: '$1-5', right: '$1-5' }}
        >
          <DsTooltip content="Clear time range selection">
            <Button onClick={handleClearClick}>
              <Close24 />
            </Button>
          </DsTooltip>
          <DsTooltip content="Reset to default time range selection">
            <Button onClick={handleResetClick}>
              <Reset24 />
            </Button>
          </DsTooltip>
        </Flex>
      </Box>
    )
  }
)

type Dataset = {
  name: string
  dataset: Point[]
}

type Props = {
  datasets: Dataset[]
  height: number
}

export function ChartTimeValue({ datasets, height }: Props) {
  return (
    <Box css={{ height }}>
      <ParentSize>
        {({ width, height }) => (
          <Chart datasets={datasets} width={width} height={height} />
        )}
      </ParentSize>
    </Box>
  )
}
