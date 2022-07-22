import { DatumCard, Flex } from '@siafoundation/design-system'
import { PeerList } from '../../components/PeerList'
import { AuthedLayout } from '../../components/AuthedLayout'
import BigNumber from 'bignumber.js'
import { toHastings } from '@siafoundation/sia-js'

export default function ConfigPage() {
  return (
    <AuthedLayout title="Configuration">
      <Flex gap="2" wrap="wrap">
        <DatumCard
          label="Contract price"
          sc={new BigNumber(toHastings(87_000_000))}
        />
        <DatumCard
          label="Storage price"
          sc={new BigNumber(toHastings(87_000_000))}
        />
        <DatumCard
          label="Egress price"
          sc={new BigNumber(toHastings(87_000_000))}
        />
        <DatumCard
          label="Ingress price"
          sc={new BigNumber(toHastings(87_000_000))}
        />
      </Flex>
      <PeerList />
    </AuthedLayout>
  )
}
