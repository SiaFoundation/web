import {
  ChartXY,
  Flex,
  Text,
  Heading,
  Box,
  DatumCardConfigurable,
  DatumScrollArea,
} from '@siafoundation/design-system'
import { useData } from '../contexts/data'

export function HomeContracts() {
  const { collateral, contracts } = useData()

  return (
    <Flex direction="column" gap="3-5">
      <Heading>Contracts</Heading>
      <DatumScrollArea bleed>
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
      </DatumScrollArea>
      <Flex gap="2">
        <Box css={{ flex: 1, overflow: 'hidden' }}>
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
        </Box>
        <Box css={{ flex: 1, overflow: 'hidden' }}>
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
        </Box>
      </Flex>
    </Flex>
  )
}
