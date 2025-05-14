import { Text } from '@siafoundation/design-system'
import { useConsensusNetwork } from '@siafoundation/walletd-react'
import { useIsPastV2AllowHeight, useIsPastV2RequireHeight } from './hardforkV2'

export function TransactionVersionIndicator({
  type,
}: {
  type: 'seed' | 'ledger'
}) {
  const n = useConsensusNetwork()
  const network = n.data?.name
  const requireHeight = n.data?.hardforkV2.requireHeight.toLocaleString()
  const allowHeight = n.data?.hardforkV2.allowHeight.toLocaleString()
  const isV2Allowed = useIsPastV2AllowHeight()
  const isV2Required = useIsPastV2RequireHeight()

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
