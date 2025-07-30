'use client'

import { useCallback, useMemo, useState } from 'react'
import { AnimationTrajectory } from '@visx/react-spring/lib/types'
import { GlyphCross, GlyphDot, GlyphStar } from '@visx/glyph'
import { curveLinear, curveStep, curveCardinal } from '@visx/curve'
import { RenderTooltipGlyphProps } from '@visx/xychart/lib/components/Tooltip'
import { lightTheme, darkTheme } from './customTheme'
import { getChartComponents } from './getChartComponents'
import { useTheme } from 'next-themes'
import { omit } from '@technically/lodash'
import {
  ChartConfig,
  ChartData,
  ChartPoint,
  ChartType,
  CurveType,
  StackOffset,
} from './types'
import { daysInMilliseconds } from '@siafoundation/units'
import { usePrefersReducedMotion } from '@siafoundation/react-core'
import useLocalStorageState from 'use-local-storage-state'

const numTicks = 4
const defaultChartType = 'areastack'
const defaultCurveType = 'linear'
const defaultStackOffset = 'none'

type SimpleScaleConfig = { type: 'band' | 'linear'; paddingInner?: number }

export function useChartXY<Key extends string, Cat extends string>(
  id: string,
  chartData: ChartData<Key>,
  config: ChartConfig<Key, Cat>,
) {
  const [useAnimatedComponents, setUseAnimatedComponents] = useState(
    !usePrefersReducedMotion() && !config.disableAnimations,
  )
  const { resolvedTheme } = useTheme()
  const theme = useMemo(
    () => (resolvedTheme === 'dark' ? darkTheme : lightTheme),
    [resolvedTheme],
  )
  const [animationTrajectory, setAnimationTrajectory] = useState<
    AnimationTrajectory | undefined
  >('center')
  const [gridProps, setGridProps] = useState<[boolean, boolean]>([false, false])
  const [showGridRows, showGridColumns] = gridProps
  const [xAxisOrientation, setXAxisOrientation] = useLocalStorageState<
    'top' | 'bottom'
  >(`${id}/xAxisOrientation`, {
    defaultValue: 'bottom',
  })
  const [yAxisOrientation, setYAxisOrientation] = useLocalStorageState<
    'left' | 'right'
  >(`${id}/yAxisOrientation`, {
    defaultValue: 'right',
  })
  const [showTooltip, setShowTooltip] = useState(true)
  const [showVerticalCrosshair, setShowVerticalCrosshair] = useState(true)
  const [showHorizontalCrosshair, setShowHorizontalCrosshair] = useState(false)
  const [snapTooltipToDatum, setSnapTooltipToDatum] = useState(true)
  const [sharedTooltip, setSharedTooltip] = useState(true)

  const [chartType, setChartType] = useLocalStorageState<ChartType>(
    `${id}/chartType`,
    {
      defaultValue: config.chartType || defaultChartType,
    },
  )
  const [curveType, setCurveType] = useLocalStorageState<CurveType>(
    `${id}/curveType`,
    {
      defaultValue: config.curveType || defaultCurveType,
    },
  )
  const [stackOffset, setStackOffset] = useLocalStorageState<StackOffset>(
    `${id}/stackOffset`,
    {
      defaultValue: config.stackOffset || defaultStackOffset,
    },
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialChartType = useMemo(() => config.chartType, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialCurveType = useMemo(() => config.curveType, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialStackOffset = useMemo(() => config.stackOffset, [])

  const isLine = ['line', 'area', 'areastack'].includes(chartType)
  const isStack = ['barstack', 'areastack'].includes(chartType)
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
    [tooltipGlyphComponent, glyphOutline],
  )

  const data = useMemo(() => {
    chartData.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
    if (chartData.length === 0) {
      return []
    }
    const lastEl = chartData[chartData.length - 1]
    // visx XYChart essentially clips the last datum. It seems like the tooltips
    // nearestDatum calculation prioritizes the datum to the left and therefore
    // never snaps to the final data point.
    // This is an open issue: https://github.com/airbnb/visx/issues?q=is%3Aissue+nearestDatum
    // To get around this, we simply add an extra point which makes the last real datum
    // appear as the final visible/hoverable datum.
    // barstack and bargroup do not have this issue and show all datums.
    if (chartType !== 'barstack' && chartType !== 'bargroup') {
      return [
        ...chartData,
        { ...lastEl, timestamp: lastEl.timestamp + daysInMilliseconds(1) },
      ]
    }
    return chartData
  }, [chartType, chartData])
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

  const keys = useMemo(
    () => Object.keys(omit(chartData[0], 'timestamp')) as Key[],
    [chartData],
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
        {} as Record<string, (d: ChartPoint<Key>) => number>,
      ),
      y: keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: (d: ChartPoint<Key>) => d[key],
        }),
        {} as Record<string, (d: ChartPoint<Key>) => number>,
      ),
      date: (d: ChartPoint<Key>) => d.timestamp,
    }),
    [keys],
  )

  const scales = useMemo(
    () => ({
      x: {
        type: 'band',
        paddingInner: isLine ? 1 : 0.3,
      } as SimpleScaleConfig,
      y: { type: 'linear' } as SimpleScaleConfig,
    }),
    [isLine],
  )

  const curve = useMemo(
    () =>
      (curveType === 'cardinal' && curveCardinal) ||
      (curveType === 'step' && curveStep) ||
      curveLinear,
    [curveType],
  )

  const margin = useMemo(
    () => ({
      top: 30,
      bottom: xAxisOrientation === 'top' ? 0 : 20,
      right: yAxisOrientation === 'right' ? 60 : 0,
      left: yAxisOrientation === 'left' ? 60 : 0,
    }),
    [xAxisOrientation, yAxisOrientation],
  )

  return {
    id,
    accessors,
    useAnimatedComponents,
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
    initialChartType,
    initialCurveType,
    initialStackOffset,
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
