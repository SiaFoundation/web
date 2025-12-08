import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/units'
import { useMetrics } from '../../contexts/metrics'

export function HomeBandwidth() {
  const { bandwidth } = useMetrics()
  return (
    <div className="flex flex-col gap-3 flex-1">
      <Heading>Bandwidth</Heading>
      <DatumScrollArea bleed>
        <DatumCardConfigurable
          category="bandwidth"
          label="ingress"
          color={bandwidth.config.data['ingress'].color}
          value={bandwidth.stats['ingress']}
          defaultMode="total"
          isLoading={bandwidth.isLoading}
          valueFormat={humanBytes}
        />
        <DatumCardConfigurable
          category="bandwidth"
          label="egress"
          color={bandwidth.config.data['egress'].color}
          value={bandwidth.stats['egress']}
          defaultMode="total"
          isLoading={bandwidth.isLoading}
          valueFormat={humanBytes}
        />
      </DatumScrollArea>
      <ChartXY
        id="hostd/v0/metrics/graphs/bandwidth"
        height={300}
        data={bandwidth.data}
        config={bandwidth.config}
        isLoading={bandwidth.isLoading}
        actionsLeft={
          <Text font="mono" weight="semibold">
              Bandwidth
            </Text>
        }
      />
    </div>
  )
}
