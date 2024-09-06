import { to } from '@siafoundation/request'
import { ExplorerBlock } from '@siafoundation/explored-types'
import { explored } from '../config/explored'

export async function getBlockByHeight(height: number) {
  // Grab the tip at this height.
  const [tip, tipError] = await to(
    explored.consensusTipByHeight({ params: { height } })
  )

  if (tipError) throw tipError
  if (!tip) return null

  // Grab the block with the ID at this tip height.
  const [block, blockError] = await to(
    explored.blockByID({ params: { id: tip.id } })
  )

  if (blockError) throw blockError
  if (!block) return null

  return block
}

export async function getLatestBlocks(
  n = 6
): Promise<[ExplorerBlock[], undefined] | [undefined, Error]> {
  // Grab the latest tip.
  const [latestTip, latestTipError] = await to(explored.consensusTip())
  if (latestTipError) throw latestTipError
  if (!latestTip) return [undefined, Error('No tip found')]

  const fetchedBlocks: ExplorerBlock[] = []
  let parentBlockID = latestTip.id

  // Fetch the latest n blocks.
  for (let i = 1; i <= n; i++) {
    const [block, blockError] = await to(
      explored.blockByID({ params: { id: parentBlockID } })
    )
    if (blockError) throw blockError
    if (!block) continue
    parentBlockID = block.parentID
    fetchedBlocks.push(block)
  }

  if (fetchedBlocks.length) {
    return [fetchedBlocks, undefined]
  }
  return [undefined, Error('No blocks found')]
}
