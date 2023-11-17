import { Radio, RadioGroup } from '../../core/Radio'
import { Text } from '../../core/Text'
import { ChartXYProps } from './useChartXY'
import { ChartType, CurveType, StackOffset } from './types'
import { InfoTip } from '../../core/InfoTip'
import { Dialog } from '../../core/Dialog'
import { Settings16 } from '@siafoundation/react-icons'
import { Button } from '../../core/Button'

export function ChartXYConfig<Key extends string, Cat extends string>({
  initialChartType,
  chartType,
  setChartType,
  curveType,
  setCurveType,
  isLine,
  isStack,
  stackOffset,
  setStackOffset,
  xAxisOrientation,
  setXAxisOrientation,
  yAxisOrientation,
  setYAxisOrientation,
}: ChartXYProps<Key, Cat>) {
  const shouldDisableAll = initialChartType === 'line'
  const shouldDisableStack = initialChartType === 'area'
  return (
    <Dialog
      trigger={
        <Button tip="Configure chart" variant="gray" size="small">
          <Settings16 />
        </Button>
      }
      title="Chart settings"
      contentVariants={{
        className: 'max-h-[70vh]',
      }}
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-4">
        <div className="flex flex-col gap-4">
          <Text weight="semibold">Graph type</Text>
          <RadioGroup
            value={chartType}
            onValueChange={(v) => setChartType(v as ChartType)}
            className="flex flex-col gap-1"
          >
            <Radio value="line">Line</Radio>
            <Radio
              disabled={shouldDisableAll || shouldDisableStack}
              value="areastack"
            >
              Area Stack
            </Radio>
            <Radio
              disabled={shouldDisableAll || shouldDisableStack}
              value="barstack"
            >
              Bar Stack
            </Radio>
            <Radio disabled={shouldDisableAll} value="area">
              Area
            </Radio>
            <Radio disabled={shouldDisableAll} value="bargroup">
              Bar Group
            </Radio>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <Text weight="semibold">Stack series offset</Text>
          <RadioGroup
            value={stackOffset}
            onValueChange={(v) => setStackOffset(v as StackOffset)}
            className="flex flex-col gap-1"
          >
            <Radio disabled={!isStack} value="none">
              None
              <InfoTip>zero-baseline</InfoTip>
            </Radio>
            <Radio disabled={!isStack} value="diverging">
              Diverging
              <InfoTip>non zero-baseline</InfoTip>
            </Radio>
            <Radio disabled={!isStack} value="expand">
              Expand
              <InfoTip>values sum to 1</InfoTip>
            </Radio>
            <Radio disabled={!isStack} value="wiggle">
              Wiggle
              <InfoTip>stream graph</InfoTip>
            </Radio>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <Text weight="semibold">Curve shape</Text>
          <RadioGroup
            value={curveType}
            onValueChange={(v) => setCurveType(v as CurveType)}
            className="flex flex-col gap-1"
          >
            <Radio disabled={!isLine} value="linear">
              Linear
            </Radio>
            <Radio disabled={!isLine} value="cardinal">
              Cardinal
            </Radio>
            <Radio disabled={!isLine} value="step">
              Step
            </Radio>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <Text weight="semibold">Axes</Text>
          <div className="flex flex-col gap-6">
            <RadioGroup
              value={xAxisOrientation}
              onValueChange={(v) => setXAxisOrientation(v as 'bottom' | 'top')}
              className="flex flex-col gap-1"
            >
              <Radio value="bottom">Bottom</Radio>
              <Radio value="top">Top</Radio>
            </RadioGroup>
            <RadioGroup
              value={yAxisOrientation}
              onValueChange={(v) => setYAxisOrientation(v as 'left' | 'right')}
              className="flex flex-col gap-2"
            >
              <Radio value="left">Left</Radio>
              <Radio value="right">Right</Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
