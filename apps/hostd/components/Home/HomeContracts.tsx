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
    <div className="flex flex-col gap-7">
      <Heading>Contracts</Heading>
      <DatumScrollArea bleed>
        <DatumCardConfigurable
          label="Active contracts"
          value={contracts.stats['active']}
          format={(v) => v.toFixed(0)}
          defaultMode="latest"
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
        height={300}
      />
    </div>
  )
}
