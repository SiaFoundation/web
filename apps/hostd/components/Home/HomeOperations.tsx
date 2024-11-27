import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { humanNumber } from '@siafoundation/units'
import { useMetrics } from '../../contexts/metrics'

export function HomeOperations() {
  const { operations } = useMetrics()
  return (
    <div className="flex flex-col gap-3 flex-1">
      <Heading>Operations</Heading>
      <DatumScrollArea bleed>
        <DatumCardConfigurable
          category="operations"
          label="storage reads"
          color={operations.config.data['storageReads'].color}
          value={operations.stats['storageReads']}
          defaultMode="total"
          isLoading={operations.isLoading}
          enabledModes={['total', 'average', 'latest']}
          valueFormat={humanNumber}
        />
        <DatumCardConfigurable
          category="operations"
          label="storage writes"
          color={operations.config.data['storageWrites'].color}
          value={operations.stats['storageWrites']}
          defaultMode="total"
          isLoading={operations.isLoading}
          enabledModes={['total', 'average', 'latest']}
          valueFormat={humanNumber}
        />
      </DatumScrollArea>
      <ChartXY
        id="hostd/v0/metrics/graphs/operations"
        height={300}
        data={operations.data}
        config={operations.config}
        isLoading={operations.isLoading}
        actionsLeft={
          <>
            <Text font="mono" weight="semibold">
              Operations
            </Text>
          </>
        }
      />
    </div>
  )
}
