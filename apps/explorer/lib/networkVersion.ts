import { getExplored } from './explored'
import { logger } from './logger'

export async function getNetworkVersion(
  traceId?: string,
): Promise<'v1' | 'v2'> {
  const start = Date.now()
  const explored = await getExplored(undefined, traceId)
  const [{ data: chainIndex }, { data: consensusNetwork }] = await Promise.all([
    explored.consensusTip(),
    explored.consensusNetwork(),
  ])

  const allowHeight = consensusNetwork.hardforkV2.allowHeight
  const version = chainIndex.height >= allowHeight ? 'v2' : 'v1'
  logger.info('network', 'version_resolved', {
    trace_id: traceId,
    version,
    height: chainIndex.height,
    allow_height: allowHeight,
    duration_ms: Date.now() - start,
  })
  return version
}
