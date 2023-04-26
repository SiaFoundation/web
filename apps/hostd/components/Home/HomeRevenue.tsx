import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { useMetrics } from '../../contexts/metrics'
import { chartConfigs } from '../../config/charts'

export function HomeRevenue() {
  const { revenue } = useMetrics()

  return (
    <div className="flex flex-col gap-3">
      <Heading>Revenue</Heading>
      <DatumScrollArea bleed>
        <DatumCardConfigurable
          label="earned revenue"
          sc={revenue.stats['total']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          label="potential revenue"
          sc={revenue.stats['potential']}
          defaultMode="total"
          isLoading={revenue.isLoading}
          showChange={false}
        />
        <DatumCardConfigurable
          label="storage"
          color={chartConfigs.storage.color}
          sc={revenue.stats['storage']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          label="egress"
          color={chartConfigs.egress.color}
          sc={revenue.stats['egress']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          label="ingress"
          color={chartConfigs.ingress.color}
          sc={revenue.stats['ingress']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          label="registry read"
          color={chartConfigs.registry.color}
          sc={revenue.stats['registryRead']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          label="registry write"
          color={chartConfigs.registry.color}
          sc={revenue.stats['registryWrite']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        {/* <DatumCardConfigurable
          label="other"
          color={chartConfigs.other.color}
          sc={revenue.stats['other']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        /> */}
      </DatumScrollArea>
      <ChartXY
        id="revenue"
        height={300}
        data={revenue.data}
        config={revenue.config}
        isLoading={revenue.isLoading}
        actionsLeft={
          <>
            <Text font="mono" weight="semibold">
              Revenue
            </Text>
          </>
        }
      />
    </div>
  )
}
