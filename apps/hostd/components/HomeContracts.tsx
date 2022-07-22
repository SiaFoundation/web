import {
  ChartXY,
  Flex,
  Grid,
  Text,
  Heading,
} from '@siafoundation/design-system'
import { useData } from '../contexts/data'
import { DatumCardConfigurable } from './DatumCardConfigurable'

export function HomeContracts() {
  const { collateral, contracts } = useData()

  return (
    <Flex direction="column" gap="3-5">
      <Heading>Contracts</Heading>
      <Flex gap="2" wrap="wrap">
        <DatumCardConfigurable
          label="Active contracts"
          value={contracts.stats['active']}
          defaultMode="latest"
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="Locked collateral"
          sc={collateral.stats['locked']}
          defaultMode="latest"
          enabledModes={['latest', 'average']}
        />
        <DatumCardConfigurable
          label="Risked collateral"
          sc={collateral.stats['risked']}
          defaultMode="latest"
          enabledModes={['latest', 'average']}
        />
      </Flex>
      <Grid columns="2" gap="2">
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
        <ChartXY
          id="collateral"
          height={300}
          data={collateral.data}
          config={collateral.config}
          chartType="area"
          actionsLeft={
            <>
              <Text font="mono" weight="semibold">
                Collateral
              </Text>
            </>
          }
        />
      </Grid>
    </Flex>
  )
}
