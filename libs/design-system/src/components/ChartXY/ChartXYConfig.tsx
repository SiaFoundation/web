import { Radio, RadioGroup } from '../../core/Radio'
import { Text } from '../../core/Text'
import { Flex } from '../../core/Flex'
import { ChartType, ChartXYProps, CurveType, StackOffset } from './useChartXY'
import { Grid } from '../../core/Grid'
import { InfoTip } from '../../core/InfoTip'
import { Dialog, DialogContent, DialogTrigger } from '../../core/Dialog'
import { Tooltip } from '../../core/Tooltip'
import { Settings16 } from '../../icons/carbon'
import { Box } from '../../core/Box'
import { IconButton } from '../../core/IconButton'

export function ChartXYConfig({
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
}: // yAxisOrientation,
// setYAxisOrientation,
ChartXYProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Box>
          <Tooltip content="Configure chart">
            <IconButton variant="gray" size="1">
              <Settings16 />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTrigger>
      <DialogContent title="Chart settings" css={{ minWidth: '400px' }}>
        <Grid columns="2" gapX="3" gapY="5" css={{ py: '$2' }}>
          <Flex direction="column" gap="2">
            <Text weight="bold">Graph type</Text>
            <RadioGroup
              value={chartType}
              onValueChange={(v) => setChartType(v as ChartType)}
              css={{
                flexDirection: 'column',
                gap: '$1',
              }}
            >
              <Radio value="areastack">Area Stack</Radio>
              <Radio value="barstack">Bar Stack</Radio>
              <Radio value="area">Area</Radio>
              <Radio value="bargroup">Bar Group</Radio>
            </RadioGroup>
          </Flex>
          <Flex direction="column" gap="2">
            <Text weight="bold">Stack series offset</Text>
            <RadioGroup
              value={stackOffset}
              onValueChange={(v) => setStackOffset(v as StackOffset)}
              css={{
                flexDirection: 'column',
                gap: '$1',
              }}
            >
              <Radio disabled={!isStack} value="none">
                Auto
                <InfoTip>zero-baseline</InfoTip>
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
          </Flex>
          <Flex direction="column" gap="2">
            <Text weight="bold">Curve shape</Text>
            <RadioGroup
              value={curveType}
              onValueChange={(v) => setCurveType(v as CurveType)}
              css={{
                flexDirection: 'column',
                gap: '$1',
              }}
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
          </Flex>
          <Flex direction="column" gap="2">
            <Text weight="bold">Axes</Text>
            <Flex
              direction="column"
              gap="2"
              css={{
                flexDirection: 'column',
                gap: '$3',
              }}
            >
              <RadioGroup
                value={xAxisOrientation}
                onValueChange={(v) =>
                  setXAxisOrientation(v as 'bottom' | 'top')
                }
                css={{
                  flexDirection: 'column',
                  gap: '$1',
                }}
              >
                <Radio value="bottom">Bottom</Radio>
                <Radio value="top">Top</Radio>
              </RadioGroup>
              {/* <RadioGroup
            value={yAxisOrientation}
            onValueChange={(v) => setYAxisOrientation(v as 'left' | 'right')}
            css={{
              flexDirection: 'column',
              gap: '$1',
            }}
          >
            <Radio value="left">Left</Radio>
            <Radio value="right">Right</Radio>
          </RadioGroup> */}
            </Flex>
          </Flex>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
