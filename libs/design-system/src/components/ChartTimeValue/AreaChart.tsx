'use client'

import React from 'react'
import { AreaClosed } from '@visx/shape'
import { Group } from '@visx/group'
import { curveStep, curveMonotoneX } from '@visx/curve'
import { MarkerCircle } from '@visx/marker'
import { AxisLeft, AxisBottom, AxisScale } from '@visx/axis'
import { LinearGradient } from '@visx/gradient'
import { getPointTime, getPointValue, Point } from './utils'

const axisColor = 'var(--colors-hiContrast)'
const axisBottomTickLabelProps = {
  textAnchor: 'middle' as const,
  fontFamily: 'var(--fonts-sans)',
  fontSize: 10,
  fill: axisColor,
}
const axisLeftTickLabelProps = {
  dx: '-0.25em',
  dy: '0.25em',
  fontFamily: 'var(--fonts-sans)',
  fontSize: 10,
  textAnchor: 'end' as const,
  fill: axisColor,
}

export function AreaChart({
  data,
  gradientColor,
  width,
  yMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  top,
  left,
  curve = 'step',
  children,
}: {
  data: Point[]
  gradientColor: string
  xScale: AxisScale<number>
  yScale: AxisScale<number>
  width: number
  yMax: number
  margin: { top: number; right: number; bottom: number; left: number }
  hideBottomAxis?: boolean
  hideLeftAxis?: boolean
  top?: number
  left?: number
  curve?: 'step' | 'monotone'
  children?: React.ReactNode
}) {
  if (width < 10) return null
  return (
    <Group left={left || margin.left} top={top || margin.top}>
      <MarkerCircle
        id="marker-circle"
        fill="var(--colors-accent11)"
        size={1.5}
        refX={1.5}
      />
      <LinearGradient
        id="gradient"
        from={gradientColor}
        fromOpacity={1}
        to={gradientColor}
        toOpacity={0.2}
      />
      <AreaClosed<Point>
        data={data}
        x={(d) => xScale(getPointTime(d)) || 0}
        y={(d) => yScale(getPointValue(d)) || 0}
        yScale={yScale}
        strokeWidth={1}
        stroke="url(#gradient)"
        fill="url(#gradient)"
        markerMid="url(#marker-circle)"
        curve={curve === 'step' ? curveStep : curveMonotoneX}
      />
      {!hideBottomAxis && (
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={width > 520 ? 10 : 5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisBottomTickLabelProps}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisLeftTickLabelProps}
        />
      )}
      {children}
    </Group>
  )
}
