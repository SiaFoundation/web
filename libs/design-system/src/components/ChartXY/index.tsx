import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Box } from '../../core/Box'
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
import { Flex } from '../../core/Flex'
import { ChartXYConfig } from './ChartXYConfig'

export type { ChartPoint, ChartData, ChartConfig }

type Props = {
  id: string
  height: number
  data: ChartData
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
  actionsRight,
  chartType = 'areastack',
  curveType = 'linear',
  stackOffset = 'none',
  variant = 'panel',
}: Props) {
  const props = useChartXY(id, data, config, chartType, curveType, stackOffset)

  const body = (
    <>
      <Flex gap="1" css={{ position: 'absolute', top: '$1-5', right: '$2' }}>
        {actionsRight}
        {variant === 'panel' && <ChartXYConfig {...props} />}
      </Flex>
      <Flex gap="1" css={{ position: 'absolute', top: '$1-5', left: '$2' }}>
        {actionsLeft}
      </Flex>
      <ParentSize>
        {({ width, height }) => (
          <ChartXYGraph {...props} width={width} height={height} />
        )}
      </ParentSize>
    </>
  )

  if (variant === 'panel') {
    return (
      <Panel css={{ position: 'relative', height, padding: '1px' }}>
        {body}
      </Panel>
    )
  }

  return (
    <Box css={{ position: 'relative', height, padding: '1px' }}>{body}</Box>
  )
}
