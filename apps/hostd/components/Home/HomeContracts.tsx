import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { useMetrics } from '../../contexts/metrics'

export function HomeContracts() {
  const { contracts } = useMetrics()

  return (
    <div className="flex flex-col gap-3">
      <Heading>Contracts</Heading>
      <DatumScrollArea bleed>
        <DatumCardConfigurable
          category="contracts"
          label="Active contracts"
          color={contracts.config.data['active'].color}
          value={contracts.stats['active']}
          format={(v) => v.toFixed(0)}
          defaultMode="latest"
          isLoading={contracts.isLoading}
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          category="contracts"
          label="Successful contracts"
          color={contracts.config.data['successful'].color}
          value={contracts.stats['successful']}
          format={(v) => v.toFixed(0)}
          defaultMode="latest"
          isLoading={contracts.isLoading}
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          category="contracts"
          label="Failed contracts"
          color={contracts.config.data['failed'].color}
          value={contracts.stats['failed']}
          format={(v) => v.toFixed(0)}
          defaultMode="latest"
          isLoading={contracts.isLoading}
          enabledModes={['latest', 'average']}
        />
      </DatumScrollArea>
      <ChartXY
        id="contracts"
        actionsLeft={
          <>
            <Text font="mono" weight="semibold">
              Contracts
            </Text>
          </>
        }
        data={contracts.data}
        config={contracts.config}
        isLoading={contracts.isLoading}
        chartType={contracts.chartType}
        height={300}
      />
    </div>
  )
}
