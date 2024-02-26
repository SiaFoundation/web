import {
  ChartXY,
  Text,
  Heading,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { useMetrics } from '../../contexts/metrics'

export function HomeCollateral() {
  const { collateral } = useMetrics()

  return (
    <div className="flex flex-col gap-3">
      <Heading>Collateral</Heading>
      <DatumScrollArea bleed>
        <DatumCardConfigurable
          category="collateral"
          label="Locked collateral"
          color={collateral.config.data['locked'].color}
          sc={collateral.stats['locked']}
          defaultMode="latest"
          isLoading={collateral.isLoading}
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          category="collateral"
          label="Risked collateral"
          color={collateral.config.data['risked'].color}
          sc={collateral.stats['risked']}
          defaultMode="latest"
          isLoading={collateral.isLoading}
          enabledModes={['latest', 'average']}
        />
      </DatumScrollArea>
      <ChartXY
        id="hostd/v0/metrics/graphs/collateral"
        actionsLeft={
          <>
            <Text font="mono" weight="semibold">
              Collateral
            </Text>
          </>
        }
        data={collateral.data}
        config={collateral.config}
        isLoading={collateral.isLoading}
        height={300}
      />
    </div>
  )
}
