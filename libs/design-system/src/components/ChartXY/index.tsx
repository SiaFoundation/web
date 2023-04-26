import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Panel } from '../../core/Panel'
import { ChartXYGraph } from './ChartXYGraph'
import {
  ChartPoint,
  ChartData,
  useChartXY,
  ChartConfig,
  ChartType,
  CurveType,
  StackOffset,
} from './useChartXY'
import { ChartXYConfig } from './ChartXYConfig'
import { LoadingDots } from '../LoadingDots'

export type { ChartPoint, ChartData, ChartConfig }

type Props = {
  id: string
  height: number
  data: ChartData
  isLoading?: boolean
  config: ChartConfig
  chartType?: ChartType
  curveType?: CurveType
  stackOffset?: StackOffset
  actionsRight?: React.ReactNode
  actionsLeft?: React.ReactNode
  variant?: 'panel' | 'ghost'
}

export function ChartXY({
  id,
  height,
  data,
  config,
  actionsLeft,
  isLoading,
  actionsRight,
  chartType = 'areastack',
  curveType = 'linear',
  stackOffset = 'none',
  variant = 'panel',
}: Props) {
  const props = useChartXY(id, data, config, chartType, curveType, stackOffset)

  const body = (
    <>
      <div className="flex gap-2 absolute top-3 right-4">
        {actionsRight}
        {variant === 'panel' && <ChartXYConfig {...props} />}
      </div>
      <div className="flex gap-2 absolute top-3 left-4">{actionsLeft}</div>
      <ParentSize>
        {({ width, height }) =>
          isLoading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingDots className="scale-150" />
            </div>
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
