import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/units'
import { useMetrics } from '../../contexts/metrics'

export function HomeStorage() {
  const { storage } = useMetrics()
  return (
    <div className="flex flex-col gap-3 flex-1">
      <Heading>Storage</Heading>
      <DatumScrollArea bleed>
        <DatumCardConfigurable
          category="storage"
          label="storage - physical"
          color={storage.config.data['physicalSectors'].color}
          value={storage.stats['physicalSectors']}
          defaultMode="latest"
          isLoading={storage.isLoading}
          enabledModes={['latest', 'average']}
          valueFormat={humanBytes}
        />
        <DatumCardConfigurable
          category="storage"
          label="storage - contract"
          color={storage.config.data['contractSectors'].color}
          value={storage.stats['contractSectors']}
          defaultMode="latest"
          isLoading={storage.isLoading}
          enabledModes={['latest', 'average']}
          valueFormat={humanBytes}
        />
        <DatumCardConfigurable
          category="storage"
          label="storage - temp"
          color={storage.config.data['tempSectors'].color}
          value={storage.stats['tempSectors']}
          defaultMode="latest"
          isLoading={storage.isLoading}
          enabledModes={['latest', 'average']}
          valueFormat={humanBytes}
        />
        <DatumCardConfigurable
          category="storage"
          label="storage - lost"
          color={storage.config.data['lostSectors'].color}
          value={storage.stats['lostSectors']}
          defaultMode="latest"
          isLoading={storage.isLoading}
          enabledModes={['latest', 'average']}
          valueFormat={humanBytes}
        />
      </DatumScrollArea>
      <ChartXY
        id="hostd/v0/metrics/graphs/storage"
        height={300}
        data={storage.data}
        config={storage.config}
        isLoading={storage.isLoading}
        actionsLeft={
          <Text font="mono" weight="semibold">
              Storage
            </Text>
        }
      />
    </div>
  )
}
