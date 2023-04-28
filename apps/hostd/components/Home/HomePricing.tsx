import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { useMetrics } from '../../contexts/metrics'

export function HomePricing() {
  const { pricing } = useMetrics()

  return (
    <div className="flex flex-col gap-3">
      <Heading>Pricing</Heading>
      <DatumScrollArea bleed>
        <DatumCardConfigurable
          label="storage"
          color={pricing.config.data['storage'].color}
          sc={pricing.stats['storage']}
          defaultMode="latest"
          isLoading={pricing.isLoading}
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="ingress"
          color={pricing.config.data['ingress'].color}
          sc={pricing.stats['ingress']}
          defaultMode="latest"
          isLoading={pricing.isLoading}
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="egress"
          color={pricing.config.data['egress'].color}
          sc={pricing.stats['egress']}
          defaultMode="latest"
          isLoading={pricing.isLoading}
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="collateral"
          color={pricing.config.data['collateral'].color}
          sc={pricing.stats['collateral']}
          defaultMode="latest"
          isLoading={pricing.isLoading}
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="contract"
          color={pricing.config.data['contract'].color}
          sc={pricing.stats['contract']}
          defaultMode="latest"
          isLoading={pricing.isLoading}
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="sector access"
          color={pricing.config.data['sectorAccess'].color}
          sc={pricing.stats['sectorAccess']}
          defaultMode="latest"
          isLoading={pricing.isLoading}
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="base RPC"
          color={pricing.config.data['baseRPC'].color}
          sc={pricing.stats['baseRPC']}
          defaultMode="latest"
          isLoading={pricing.isLoading}
          enabledModes={['latest', 'average']}
        />
      </DatumScrollArea>
      <ChartXY
        id="pricing"
        height={300}
        data={pricing.data}
        config={pricing.config}
        isLoading={pricing.isLoading}
        chartType={pricing.chartType}
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
