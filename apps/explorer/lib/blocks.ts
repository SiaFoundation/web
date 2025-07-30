import { ExplorerBlock } from '@siafoundation/explored-types'
import { getExplored } from './explored'

export async function getBlockByHeight(height: number) {
  const explored = await getExplored()
  // Grab the tip at this height.
  const { data: tip } = await explored.consensusTipByHeight({
    params: { height },
  })

  // Return the block with the ID at this tip height.
  const { data: block } = await explored.blockByID({
    params: { id: tip.id },
  })

  return block
}

export async function getLatestBlocks(
  n = 6,
): Promise<[ExplorerBlock[], undefined] | [undefined, Error]> {
  const explored = await getExplored()
  // Grab the latest tip.
  const { data: latestTip } = await explored.consensusTip()

  const fetchedBlocks: ExplorerBlock[] = []
  let parentBlockID = latestTip.id

  // Fetch the latest n blocks.
  for (let i = 1; i <= n; i++) {
    const { data: block } = await explored.blockByID({
      params: { id: parentBlockID },
    })
    parentBlockID = block.parentID
    fetchedBlocks.push(block)
  }

  if (fetchedBlocks.length) {
    return [fetchedBlocks, undefined]
  }
  return [undefined, Error('No blocks found')]
}
