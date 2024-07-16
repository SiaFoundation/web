import { to } from '@siafoundation/request'
import type { SiaCentralBlock } from '@siafoundation/sia-central-types'
import { range } from '@technically/lodash'
import { siaCentral } from '../config/siaCentral'

export async function getLastFewBlocks(
  block?: SiaCentralBlock,
): Promise<[SiaCentralBlock[], undefined] | [undefined, Error]> {
  if (!block) {
    return [undefined, Error('no block')]
  }
  const lastBlockHeight = block.height || 0
  const [blocks] = await to(
    siaCentral.blocks({
      data: {
        heights: range(lastBlockHeight - 4, lastBlockHeight),
      },
    }),
  )
  if (blocks?.blocks) {
    return [[block, ...blocks.blocks], undefined]
  }
  return [undefined, Error('no blocks')]
}
