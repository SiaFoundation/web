import { ExplorerBlock } from '@siafoundation/explored-types'
import {
  fetchBlockByID,
  fetchConsensusTip,
  fetchConsensusTipByHeight,
} from './fetchChainData'

export async function getBlockByHeight(height: number) {
  // Grab the tip at this height.
  const tip = await fetchConsensusTipByHeight(height)

  // Return the block with the ID at this tip height.
  const block = await fetchBlockByID(tip.id)

  return block
}

export async function getLatestBlocks(
  n = 6
): Promise<[ExplorerBlock[], undefined] | [undefined, Error]> {
  // Grab the latest tip.
  const latestTip = await fetchConsensusTip()

  const fetchedBlocks: ExplorerBlock[] = []
  let parentBlockID = latestTip.id

  // Fetch the latest n blocks.
  for (let i = 1; i <= n; i++) {
    const block = await fetchBlockByID(parentBlockID)
    parentBlockID = block.parentID
    fetchedBlocks.push(block)
  }

  if (fetchedBlocks.length) {
    return [fetchedBlocks, undefined]
  }
  return [undefined, Error('No blocks found')]
}
