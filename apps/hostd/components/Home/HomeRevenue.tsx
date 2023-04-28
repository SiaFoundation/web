import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { useMetrics } from '../../contexts/metrics'

export function HomeRevenue() {
  const { revenue } = useMetrics()

  return (
    <div className="flex flex-col gap-3">
      <Heading>Revenue</Heading>
      <DatumScrollArea bleed>
        <DatumCardConfigurable
          label="earned revenue"
          color={revenue.config.data['earned'].color}
          sc={revenue.stats['earned']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          label="potential revenue"
          color={revenue.config.data['potential'].color}
          sc={revenue.stats['potential']}
          defaultMode="total"
          isLoading={revenue.isLoading}
          showChange={false}
        />
        <DatumCardConfigurable
          label="storage"
          color={revenue.config.data['storage'].color}
          sc={revenue.stats['storage']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          label="egress"
          color={revenue.config.data['egress'].color}
          sc={revenue.stats['egress']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          label="ingress"
          color={revenue.config.data['ingress'].color}
          sc={revenue.stats['ingress']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          label="registry read"
          color={revenue.config.data['registryRead'].color}
          sc={revenue.stats['registryRead']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          label="registry write"
          color={revenue.config.data['registryWrite'].color}
          sc={revenue.stats['registryWrite']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
      </DatumScrollArea>
      <ChartXY
        id="revenue"
        height={300}
        data={revenue.data}
        config={revenue.config}
        isLoading={revenue.isLoading}
        chartType={revenue.chartType}
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
