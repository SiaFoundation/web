import { getExplored } from '../../../lib/explored'
import { BlockMetrics } from '../../../components/BlockMetrics'
import { to } from '@siafoundation/request'
import { notFound } from 'next/navigation'

export default async function Page() {
  const explored = await getExplored()

  const [tip, tipError, tipResponse] = await to(explored.consensusTip())

  if (tipError || !tip) {
    if (tipResponse?.status === 404) return notFound()
    throw tipError
  }

  return <BlockMetrics currentTip={tip.height} />
}
