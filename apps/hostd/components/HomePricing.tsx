import { ChartXY, Flex, Text, Heading } from '@siafoundation/design-system'
import { useData } from '../contexts/data'
import { chartConfigs } from '../config/charts'
import { DatumCardConfigurable } from './DatumCardConfigurable'

export function HomePricing() {
  const { pricing } = useData()

  return (
    <Flex direction="column" gap="3-5">
      <Heading>Pricing</Heading>
      <Flex gap="2">
        <DatumCardConfigurable
          label="contract"
          color={chartConfigs.contract.color}
          sc={pricing.stats['contract']}
          defaultMode="latest"
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="storage"
          color={chartConfigs.storage.color}
          sc={pricing.stats['storage']}
          defaultMode="latest"
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="registry"
          color={chartConfigs.registry.color}
          sc={pricing.stats['registry']}
          defaultMode="latest"
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="ingress"
          color={chartConfigs.ingress.color}
          sc={pricing.stats['ingress']}
          defaultMode="latest"
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="egress"
          color={chartConfigs.egress.color}
          sc={pricing.stats['egress']}
          defaultMode="latest"
          enabledModes={['latest', 'average']}
        />
      </Flex>
      <ChartXY
        id="pricing"
        height={300}
        data={pricing.data}
        config={pricing.config}
        chartType="line"
        actionsLeft={
          <>
            <Text font="mono" weight="semibold">
              Pricing
            </Text>
          </>
        }
      />
    </Flex>
  )
}
