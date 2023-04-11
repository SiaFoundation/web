import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { useData } from '../../contexts/data'
import { chartConfigs } from '../../config/charts'

export function HomePricing() {
  const { pricing } = useData()

  return (
    <div className="flex flex-col gap-7">
      <Heading>Pricing</Heading>
      <DatumScrollArea bleed>
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
      </DatumScrollArea>
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
    </div>
  )
}
