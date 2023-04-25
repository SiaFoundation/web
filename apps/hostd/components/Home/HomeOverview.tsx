import {
  DatumCard,
  Heading,
  DatumScrollArea,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { toHastings } from '@siafoundation/sia-js'

export function HomeOverview() {
  return (
    <div className="flex flex-col gap-3">
      <Heading>Overview</Heading>
      <DatumScrollArea>
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
      </DatumScrollArea>
    </div>
  )
}
