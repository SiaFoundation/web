import { useCallback, useMemo, useState } from 'react'
import { AnimationTrajectory } from '@visx/react-spring/lib/types'
import { GlyphCross, GlyphDot, GlyphStar } from '@visx/glyph'
import { curveLinear, curveStep, curveCardinal } from '@visx/curve'
import { RenderTooltipGlyphProps } from '@visx/xychart/lib/components/Tooltip'
import { lightTheme, darkTheme } from './customTheme'
import { userPrefersReducedMotion } from '../../hooks/userPrefersReducedMotion'
import { getChartComponents } from './getChartComponents'
import { useTheme } from '../../hooks/useTheme'
import { omit } from 'lodash'
import {
  ChartConfig,
  ChartData,
  ChartPoint,
  ChartType,
  CurveType,
  StackOffset,
} from './types'

const numTicks = 4

type SimpleScaleConfig = { type: 'band' | 'linear'; paddingInner?: number }

export function useChartXY<Key extends string, Cat extends string>(
  id: string,
  chartData: ChartData<Key>,
  config: ChartConfig<Key, Cat>,
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
    !userPrefersReducedMotion() && !config.disableAnimations
  )
  const { activeTheme } = useTheme()
  const theme = useMemo(
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
  const glyphOutline = theme.xyChartTheme.gridStyles.stroke
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
    }: RenderTooltipGlyphProps<ChartPoint<Key>>) => {
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
    () => Object.keys(omit(chartData[0], 'timestamp')) as Key[],
    [chartData]
  )

  const enabledGraph = useMemo(() => {
    return config.enabledGraph || keys
  }, [keys, config])

  const enabledTip = useMemo(() => {
    return config.enabledTip || keys
  }, [keys, config])

  const accessors = useMemo(
    () => ({
      x: keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: (d: ChartPoint<Key>) => d.timestamp,
        }),
        {} as Record<string, (d: ChartPoint<Key>) => number>
      ),
      y: keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: (d: ChartPoint<Key>) => d[key],
        }),
        {} as Record<string, (d: ChartPoint<Key>) => number>
      ),
      date: (d: ChartPoint<Key>) => d.timestamp,
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
    enabledGraph,
    enabledTip,
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

export type ChartXYProps<Key extends string, Cat extends string> = ReturnType<
  typeof useChartXY<Key, Cat>
>
