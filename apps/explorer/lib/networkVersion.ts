import { fetchConsensusNetwork, fetchConsensusTip } from './fetchChainData'

export async function getNetworkVersion(): Promise<'v1' | 'v2'> {
  const [chainIndex, consensusNetwork] = await Promise.all([
    fetchConsensusTip(),
    fetchConsensusNetwork(),
  ])

  const allowHeight = consensusNetwork.hardforkV2.allowHeight
  return chainIndex.height >= allowHeight ? 'v2' : 'v1'
}
