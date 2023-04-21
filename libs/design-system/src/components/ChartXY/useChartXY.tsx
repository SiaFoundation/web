import { useCallback, useMemo, useState } from 'react'
import { XYChartTheme } from '@visx/xychart'
import { AnimationTrajectory } from '@visx/react-spring/lib/types'
import { GlyphCross, GlyphDot, GlyphStar } from '@visx/glyph'
import { curveLinear, curveStep, curveCardinal } from '@visx/curve'
import { RenderTooltipGlyphProps } from '@visx/xychart/lib/components/Tooltip'
import { lightTheme, darkTheme } from './customTheme'
import { userPrefersReducedMotion } from '../../hooks/userPrefersReducedMotion'
import { getChartComponents } from './getChartComponents'
import { useTheme } from '../../hooks/useTheme'
import { omit } from 'lodash'

const numTicks = 4

export type ChartConfig = {
  enabled?: {
    [name: string]: boolean
  }
  data: {
    [name: string]: {
      label?: string
      color: string
      pattern?: boolean
      fromOpacity?: number
      toOpacity?: number
    }
  }
  format: (v: number) => string
  formatTimestamp?: (v: number) => string
  disableAnimations?: boolean
}

export type ChartPoint = {
  timestamp: number
  [datum: string]: number
}

export type ChartData = ChartPoint[]

export type ChartType = 'barstack' | 'bargroup' | 'line' | 'area' | 'areastack'
export type CurveType = 'linear' | 'cardinal' | 'step'
export type StackOffset =
  | 'none'
  | 'wiggle'
  | 'expand'
  | 'diverging'
  | 'silhouette'

type SimpleScaleConfig = { type: 'band' | 'linear'; paddingInner?: number }

export function useChartXY(
  id: string,
  chartData: ChartData,
  config: ChartConfig,
  initialChartType: ChartType,
  initialCurveType: CurveType,
  initialStackOffset: StackOffset
) {
  const data = useMemo(
    () => chartData.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1)),
    [chartData]
  )
  const todayOffset = useMemo(() => {
    if (data.length < 2) {
      return 0
    }
    const range = [data[0].timestamp, data[data.length - 1].timestamp]
    const now = new Date().getTime()
    return now > range[0] && now < range[1]
      ? (now - range[0]) / (range[1] - range[0])
      : 0
  }, [data])

  const [useAnimatedComponents, setUseAnimatedComponents] = useState(
    config.disableAnimations || !userPrefersReducedMotion()
  )
  const { activeTheme } = useTheme()
  const theme = useMemo<XYChartTheme>(
    () => (activeTheme === 'dark' ? darkTheme : lightTheme),
    [activeTheme]
  )
  const [animationTrajectory, setAnimationTrajectory] = useState<
    AnimationTrajectory | undefined
  >('center')
  const [gridProps, setGridProps] = useState<[boolean, boolean]>([false, false])
  const [showGridRows, showGridColumns] = gridProps
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>(
    'bottom'
  )
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>(
    'right'
  )
  const [showTooltip, setShowTooltip] = useState(true)
  const [showVerticalCrosshair, setShowVerticalCrosshair] = useState(true)
  const [showHorizontalCrosshair, setShowHorizontalCrosshair] = useState(false)
  const [snapTooltipToDatum, setSnapTooltipToDatum] = useState(true)
  const [sharedTooltip, setSharedTooltip] = useState(true)

  const [chartType, setChartType] = useState<ChartType>(initialChartType)
  const [curveType, setCurveType] = useState<CurveType>(initialCurveType)
  const [stackOffset, setStackOffset] =
    useState<StackOffset>(initialStackOffset)
  const glyphOutline = theme.gridStyles.stroke
  const [enableTooltipGlyph, setEnableTooltipGlyph] = useState(false)
  const [tooltipGlyphComponent, setTooltipGlyphComponent] = useState<
    'star' | 'cross' | 'circle' | '🍍'
  >('star')
  const renderTooltipGlyph = useCallback(
    ({
      x,
      y,
      size,
      color,
      onPointerMove,
      onPointerOut,
      onPointerUp,
      isNearestDatum,
    }: RenderTooltipGlyphProps<ChartPoint>) => {
      const handlers = { onPointerMove, onPointerOut, onPointerUp }
      if (tooltipGlyphComponent === 'star') {
        return (
          <GlyphStar
            left={x}
            top={y}
            stroke={glyphOutline}
            fill={color}
            size={size * 10}
            {...handlers}
          />
        )
      }
      if (tooltipGlyphComponent === 'circle') {
        return (
          <GlyphDot
            left={x}
            top={y}
            stroke={glyphOutline}
            fill={color}
            r={size}
            {...handlers}
          />
        )
      }
      if (tooltipGlyphComponent === 'cross') {
        return (
          <GlyphCross
            left={x}
            top={y}
            stroke={glyphOutline}
            fill={color}
            size={size * 10}
            {...handlers}
          />
        )
      }
      return (
        <text x={x} y={y} dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
          {isNearestDatum ? '🍍' : '🍌'}
        </text>
      )
    },
    [tooltipGlyphComponent, glyphOutline]
  )

  const keys = useMemo(
    () => Object.keys(omit(chartData[0], 'timestamp')),
    [chartData]
  )

  const enabled = useMemo(() => {
    if (config.enabled) {
      return Object.entries(config.enabled)
        .filter(([_, val]) => val)
        .map(([key]) => key)
    }
    return keys
  }, [keys, config])

  const accessors = useMemo(
    () => ({
      x: keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: (d: ChartPoint) => d.timestamp,
        }),
        {} as Record<string, (d: ChartPoint) => number>
      ),
      y: keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: (d: ChartPoint) => d[key],
        }),
        {} as Record<string, (d: ChartPoint) => number>
      ),
      date: (d: ChartPoint) => d.timestamp,
    }),
    [keys]
  )

  const isLine = ['line', 'area', 'areastack'].includes(chartType)
  const isStack = ['barstack', 'areastack'].includes(chartType)

  const scales = useMemo(
    () => ({
      x: {
        type: 'band',
        paddingInner: isLine ? 1 : 0.3,
      } as SimpleScaleConfig,
      y: { type: 'linear' } as SimpleScaleConfig,
    }),
    [isLine]
  )

  const curve = useMemo(
    () =>
      (curveType === 'cardinal' && curveCardinal) ||
      (curveType === 'step' && curveStep) ||
      curveLinear,
    [curveType]
  )

  const margin = useMemo(
    () => ({
      top: 30,
      bottom: xAxisOrientation === 'top' ? 0 : 20,
      left: 0,
      right: 0,
    }),
    [xAxisOrientation]
  )

  return {
    id,
    accessors,
    animationTrajectory,
    config,
    scales,
    data,
    curve,
    chartData,
    numTicks,
    isLine,
    isStack,
    todayOffset,
    chartType,
    curveType,
    keys,
    enabled,
    renderBarGroup: chartType === 'bargroup',
    renderBarStack: chartType === 'barstack',
    enableTooltipGlyph,
    renderTooltipGlyph,
    renderAreaSeries: chartType === 'area',
    renderAreaStack: chartType === 'areastack',
    renderLineSeries: chartType === 'line',
    sharedTooltip,
    showGridColumns,
    showGridRows,
    showHorizontalCrosshair,
    showTooltip,
    showVerticalCrosshair,
    snapTooltipToDatum: !isStack && snapTooltipToDatum,
    stackOffset,
    theme,
    margin,
    xAxisOrientation,
    yAxisOrientation,
    setUseAnimatedComponents,
    setAnimationTrajectory,
    setGridProps,
    setXAxisOrientation,
    setYAxisOrientation,
    setShowTooltip,
    setShowVerticalCrosshair,
    setShowHorizontalCrosshair,
    setSnapTooltipToDatum,
    setSharedTooltip,
    setChartType,
    setCurveType,
    setStackOffset,
    setEnableTooltipGlyph,
    setTooltipGlyphComponent,
    ...getChartComponents(useAnimatedComponents),
  }
}

export type ChartXYProps = ReturnType<typeof useChartXY>
