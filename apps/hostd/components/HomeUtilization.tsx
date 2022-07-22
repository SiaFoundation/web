import {
  ChartXY,
  Flex,
  Grid,
  Text,
  Heading,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { chartConfigs } from '../config/charts'
import { useData } from '../contexts/data'
import { DatumCardConfigurable } from './DatumCardConfigurable'

export function HomeUtilization() {
  const { storage, bandwidth } = useData()
  return (
    <Grid columns="2" gap="3-5">
      <Flex direction="column" gap="3-5">
        <Heading>Storage</Heading>
        <Flex gap="2" wrap="wrap">
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
        </Flex>
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
      </Flex>
      <Flex direction="column" gap="3-5">
        <Heading>Bandwidth</Heading>
        <Flex gap="2" wrap="wrap">
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
        </Flex>
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
      </Flex>
    </Grid>
  )
}
