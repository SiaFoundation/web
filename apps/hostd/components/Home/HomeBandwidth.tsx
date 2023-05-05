import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { useMetrics } from '../../contexts/metrics'

export function HomeBandwidth() {
  const { bandwidth } = useMetrics()
  return (
    <div className="flex flex-col gap-3 flex-1 overflow-hidden">
      <Heading>Bandwidth</Heading>
      <DatumScrollArea>
        <DatumCardConfigurable
          label="ingress"
          color={bandwidth.config.data['ingress'].color}
          value={bandwidth.stats['ingress']}
          defaultMode="total"
          isLoading={bandwidth.isLoading}
          format={humanBytes}
        />
        <DatumCardConfigurable
          label="egress"
          color={bandwidth.config.data['egress'].color}
          value={bandwidth.stats['egress']}
          defaultMode="total"
          isLoading={bandwidth.isLoading}
          format={humanBytes}
        />
      </DatumScrollArea>
      <ChartXY
        id="bandwidth"
        height={300}
        data={bandwidth.data}
        config={bandwidth.config}
        isLoading={bandwidth.isLoading}
        chartType={bandwidth.chartType}
        actionsLeft={
          <>
            <Text font="mono" weight="semibold">
              Bandwidth
            </Text>
          </>
        }
      />
    </div>
  )
}
