import {
  ChartXY,
  DatumCardConfigurable,
  DatumScrollArea,
  Heading,
  Separator,
  Text,
} from '@siafoundation/design-system'
import { useMetrics } from '../../contexts/metrics'

export function HomeRevenue() {
  const { revenue } = useMetrics()

  return (
    <div className="flex flex-col gap-3">
      <Heading>Revenue</Heading>
      <DatumScrollArea bleed>
        <DatumCardConfigurable
          category="revenue"
          label="potential - all"
          color={revenue.config.data['potential'].color}
          sc={revenue.stats['potential']}
          defaultMode="total"
          isLoading={revenue.isLoading}
          showChange={false}
        />
        <Separator variant="vertical" />
        <DatumCardConfigurable
          category="revenue"
          label="earned - all"
          color={revenue.config.data['earned'].color}
          sc={revenue.stats['earned']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          category="revenue"
          label="earned - storage"
          color={revenue.config.data['storage'].color}
          sc={revenue.stats['storage']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          category="revenue"
          label="earned - egress"
          color={revenue.config.data['egress'].color}
          sc={revenue.stats['egress']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
        <DatumCardConfigurable
          category="revenue"
          label="earned - ingress"
          color={revenue.config.data['ingress'].color}
          sc={revenue.stats['ingress']}
          defaultMode="total"
          isLoading={revenue.isLoading}
        />
      </DatumScrollArea>
      <ChartXY
        id="hostd/v0/metrics/graphs/revenue"
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
