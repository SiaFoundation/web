import React from 'react'
import { AreaClosed } from '@visx/shape'
import { Group } from '@visx/group'
import { curveStep } from '@visx/curve'
import { AxisLeft, AxisBottom, AxisScale } from '@visx/axis'
import { LinearGradient } from '@visx/gradient'
import { getPointTime, getPointValue, Point } from '.'

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

export default function AreaChart({
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
  children?: React.ReactNode
}) {
  if (width < 10) return null
  return (
    <Group left={left || margin.left} top={top || margin.top}>
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
        curve={curveStep}
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
