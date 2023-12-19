'use client'

import { ParentSize } from '@visx/responsive'
import { Panel } from '../../core/Panel'
import { ChartXYGraph } from './ChartXYGraph'
import {
  Chart,
  ChartPoint,
  ChartData,
  ChartStats,
  ChartConfig,
  ChartType,
  CurveType,
  StackOffset,
} from './types'
import { useChartXY } from './useChartXY'
import { ChartXYConfig } from './ChartXYConfig'
import { LoadingDots } from '../LoadingDots'

export type { Chart, ChartPoint, ChartData, ChartStats, ChartConfig, ChartType }

type Props<Key extends string, Cat extends string> = {
  id: string
  height: string | number
  data: ChartData<Key>
  isLoading?: boolean
  config: ChartConfig<Key, Cat>
  chartType?: ChartType
  curveType?: CurveType
  stackOffset?: StackOffset
  actionsRight?: React.ReactNode
  actionsLeft?: React.ReactNode
  emptyState?: React.ReactNode
  allowConfiguration?: boolean
  variant?: 'panel' | 'ghost'
}

export function ChartXY<Key extends string, Cat extends string>({
  id,
  height,
  data,
  config,
  actionsLeft,
  isLoading,
  actionsRight,
  emptyState,
  variant = 'panel',
  allowConfiguration = true,
}: Props<Key, Cat>) {
  const props = useChartXY<Key, Cat>(id, data, config)

  const body = (
    <>
      <div className="flex gap-2 absolute top-3 right-4">
        {actionsRight}
        {variant === 'panel' && allowConfiguration && (
          <ChartXYConfig {...props} />
        )}
      </div>
      <div className="flex gap-2 absolute top-3 left-4">{actionsLeft}</div>
      <ParentSize>
        {({ width, height }) =>
          isLoading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingDots className="scale-150" />
            </div>
          ) : data.length === 0 && emptyState ? (
            emptyState
          ) : (
            <ChartXYGraph {...props} width={width} height={height} />
          )
        }
      </ParentSize>
    </>
  )

  if (variant === 'panel') {
    return (
      <Panel className="relative p-px" style={{ height }}>
        {body}
      </Panel>
    )
  }

  return (
    <div className="relative p-px" style={{ height }}>
      {body}
    </div>
  )
}
