'use client'

import {
  // animated
  AnimatedAnnotation,
  AnimatedAreaSeries,
  AnimatedAreaStack,
  AnimatedAxis,
  AnimatedBarGroup,
  AnimatedBarSeries,
  AnimatedBarStack,
  AnimatedGlyphSeries,
  AnimatedGrid,
  AnimatedLineSeries,

  // not animated
  AreaSeries,
  AreaStack,
  Axis,
  BarGroup,
  BarSeries,
  BarStack,
  Grid,
  LineSeries,

  // no animated equivalents
  Tooltip,
  XYChart,
} from '@visx/xychart'

export function getChartComponents(animated?: boolean) {
  return animated
    ? {
        Annotation: AnimatedAnnotation,
        AreaSeries: AnimatedAreaSeries,
        AreaStack: AnimatedAreaStack,
        Axis: AnimatedAxis,
        BarGroup: AnimatedBarGroup,
        BarSeries: AnimatedBarSeries,
        BarStack: AnimatedBarStack,
        GlyphSeries: AnimatedGlyphSeries,
        Grid: AnimatedGrid,
        LineSeries: AnimatedLineSeries,
        Tooltip,
        XYChart,
      }
    : {
        AreaSeries,
        AreaStack,
        Axis,
        BarGroup,
        BarSeries,
        BarStack,
        Grid,
        LineSeries,
        Tooltip,
        XYChart,
      }
}
