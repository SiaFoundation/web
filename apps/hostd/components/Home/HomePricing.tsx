import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { useMetrics } from '../../contexts/metrics'
import { chartConfigs } from '../../config/charts'

export function HomePricing() {
  const { pricing } = useMetrics()

  return (
    <div className="flex flex-col gap-3">
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
        <DatumCardConfigurable
          label="collateral"
          color={chartConfigs.collateral.color}
          sc={pricing.stats['collateral']}
          defaultMode="latest"
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="base RPC"
          color={chartConfigs.rpc.color}
          sc={pricing.stats['baseRPC']}
          defaultMode="latest"
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="sector access"
          color={chartConfigs.sectorAccess.color}
          sc={pricing.stats['sectorAccess']}
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
