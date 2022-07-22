import { DatumCard, Flex, Heading } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { toHastings } from '@siafoundation/sia-js'

export function HomeOverview() {
  return (
    <Flex direction="column" gap="3-5">
      <Heading>Overview</Heading>
      <Flex gap="2" wrap="wrap">
        <DatumCard
          label="Earned revenue"
          sc={new BigNumber(toHastings(1_300_000))}
        />
        <DatumCard
          label="Potential revenue"
          sc={new BigNumber(toHastings(580_000))}
        />
        <DatumCard label="Active contracts" value={340} />
        <DatumCard
          label="Risked collateral"
          sc={new BigNumber(toHastings(87_000_000))}
        />
        <DatumCard label="Uptime" value="48hrs" />
      </Flex>
    </Flex>
  )
}
