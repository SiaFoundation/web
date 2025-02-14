import { Text } from '@siafoundation/design-system'
import {
  useConsensusNetwork,
  useConsensusTip,
} from '@siafoundation/walletd-react'
import {
  isPastV2AllowHeight,
  isPastV2RequireHeight,
  getHardforkV2RequireHeight,
  getHardforkV2AllowHeight,
  getNetwork,
} from './hardforkV2'

export function TransactionVersionIndicator({
  type,
}: {
  type: 'seed' | 'ledger'
}) {
  const n = useConsensusNetwork()
  const ct = useConsensusTip()
  const height = ct.data?.height || 0
  const network = getNetwork(n.data?.name)

  const requireHeight = getHardforkV2RequireHeight(network).toLocaleString()
  const allowHeight = getHardforkV2AllowHeight(network).toLocaleString()

  const isV2Allowed = isPastV2AllowHeight({
    network,
    height,
  })

  const isV2Required = isPastV2RequireHeight({
    network,
    height,
  })

  if (type === 'ledger') {
    let text = ''
    if (isV2Required) {
      text = `${network} - constructing v2 transaction - switched to v2 at require height ${requireHeight}`
    } else {
      text = `${network} - constructing v1 transaction - switching to v2 at require height ${requireHeight}`
    }
    return (
      <Text color="verySubtle" size="10">
        {text}
      </Text>
    )
  }

  let text = ''
  if (isV2Required) {
    text = `${network} - constructing v2 transaction - switched to v2 at allow height ${allowHeight}`
  } else if (isV2Allowed) {
    text = `${network} - constructing v2 transaction - switched to v2 at allow height ${allowHeight}`
  } else {
    text = `${network} - constructing v1 transaction - switching to v2 at allow height ${allowHeight}`
  }

  return (
    <Text color="verySubtle" size="10">
      {text}
    </Text>
  )
}
