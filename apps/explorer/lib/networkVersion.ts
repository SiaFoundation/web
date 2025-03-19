import { getExplored } from './explored'

export async function getNetworkVersion(): Promise<'v1' | 'v2'> {
  const [{ data: chainIndex }, { data: consensusNetwork }] = await Promise.all([
    getExplored().consensusTip(),
    getExplored().consensusNetwork(),
  ])

  const allowHeight = consensusNetwork.hardforkV2.allowHeight
  return chainIndex.height >= allowHeight ? 'v2' : 'v1'
}
