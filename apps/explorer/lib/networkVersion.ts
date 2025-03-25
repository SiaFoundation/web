import { to } from '@siafoundation/request'
import { getExplored } from './explored'

export async function getNetworkVersion(): Promise<'v1' | 'v2'> {
  const [
    [chainIndex, chainIndexError],
    [consensusNetwork, consensusNetworkError],
  ] = await Promise.all([
    to(getExplored().consensusTip()),
    to(getExplored().consensusNetwork()),
  ])

  if (chainIndexError || !chainIndex) {
    throw chainIndexError
  }
  if (consensusNetworkError || !consensusNetwork) {
    throw consensusNetworkError
  }

  const allowHeight = consensusNetwork.hardforkV2.allowHeight
  return chainIndex.height >= allowHeight ? 'v2' : 'v1'
}
