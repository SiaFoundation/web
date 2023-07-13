import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { useMetrics } from '../../contexts/metrics'

export function HomeStorage() {
  const { storage } = useMetrics()
  return (
    <div className="flex flex-col gap-3 flex-1 overflow-hidden">
      <Heading>Storage</Heading>
      <DatumScrollArea>
        <DatumCardConfigurable
          label="storage"
          color={storage.config.data['physicalSectors'].color}
          value={storage.stats['physicalSectors']}
          defaultMode="latest"
          isLoading={storage.isLoading}
          enabledModes={['latest', 'average']}
          format={humanBytes}
        />
        <DatumCardConfigurable
          label="registry"
          color={storage.config.data['registryEntries'].color}
          value={storage.stats['registryEntries']}
          defaultMode="latest"
          isLoading={storage.isLoading}
          enabledModes={['latest', 'average']}
          format={humanBytes}
        />
      </DatumScrollArea>
      <ChartXY
        id="storage"
        height={300}
        data={storage.data}
        config={storage.config}
        isLoading={storage.isLoading}
        chartType={storage.chartType}
        actionsLeft={
          <>
            <Text font="mono" weight="semibold">
              Storage
            </Text>
          </>
        }
      />
    </div>
  )
}
