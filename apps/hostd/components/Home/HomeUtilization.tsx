import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { useData } from '../../contexts/data'
import { chartConfigs } from '../../config/charts'

export function HomeUtilization() {
  const { storage, bandwidth } = useData()
  return (
    <div className="flex gap-7">
      <div className="flex flex-col gap-7 flex-1 overflow-hidden">
        <Heading>Storage</Heading>
        <DatumScrollArea>
          <DatumCardConfigurable
            label="storage"
            color={chartConfigs.storage.color}
            value={storage.stats['storage']}
            defaultMode="latest"
            enabledModes={['latest', 'average']}
            format={humanBytes}
          />
          <DatumCardConfigurable
            label="registry"
            color={chartConfigs.registry.color}
            value={storage.stats['registry']}
            defaultMode="latest"
            enabledModes={['latest', 'average']}
            format={humanBytes}
          />
        </DatumScrollArea>
        <ChartXY
          id="storage"
          height={300}
          data={storage.data}
          config={storage.config}
          // chartType="line"
          actionsLeft={
            <>
              <Text font="mono" weight="semibold">
                Storage
              </Text>
            </>
          }
        />
      </div>
      <div className="flex flex-col gap-7 flex-1 overflow-hidden">
        <Heading>Bandwidth</Heading>
        <DatumScrollArea>
          <DatumCardConfigurable
            label="ingress"
            color={chartConfigs.ingress.color}
            value={bandwidth.stats['ingress']}
            defaultMode="total"
            format={humanBytes}
          />
          <DatumCardConfigurable
            label="egress"
            color={chartConfigs.egress.color}
            value={bandwidth.stats['egress']}
            defaultMode="total"
            format={humanBytes}
          />
        </DatumScrollArea>
        <ChartXY
          id="bandwidth"
          height={300}
          data={bandwidth.data}
          config={bandwidth.config}
          chartType="line"
          actionsLeft={
            <>
              <Text font="mono" weight="semibold">
                Bandwidth
              </Text>
            </>
          }
        />
      </div>
    </div>
  )
}
