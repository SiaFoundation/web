import { siaCentralApi } from '../config'
import {
  SiaCentralBlock,
  getSiaCentralBlock,
  getSiaCentralBlocks,
} from '@siafoundation/sia-central'
import { range } from '@technically/lodash'

export async function getLastFewBlocksOneByOne(block?: SiaCentralBlock) {
  if (!block) {
    return {
      error: 'no block',
    }
  }
  const lastBlockHeight = block.height || 0
  const [one, two, three, four] = await Promise.all([
    getSiaCentralBlock({
      params: {
        id: String(lastBlockHeight - 1),
      },
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralBlock({
      params: {
        id: String(lastBlockHeight - 2),
      },
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralBlock({
      params: {
        id: String(lastBlockHeight - 3),
      },
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralBlock({
      params: {
        id: String(lastBlockHeight - 4),
      },
      config: {
        api: siaCentralApi,
      },
    }),
  ])

  const blocks: SiaCentralBlock[] = []
  if (one.error) {
    return {
      error: one.error,
    }
  }
  if (two.error) {
    return {
      error: two.error,
    }
  }
  if (three.error) {
    return {
      error: three.error,
    }
  }
  if (four.error) {
    return {
      error: four.error,
    }
  }
  if (block) {
    blocks.push(block)
  }
  if (one.data) {
    blocks.push(one.data.block)
  }
  if (two.data) {
    blocks.push(two.data.block)
  }
  if (three.data) {
    blocks.push(three.data.block)
  }
  if (four.data) {
    blocks.push(four.data.block)
  }
  return {
    blocks,
  }
}

export async function getLastFewBlocks(block?: SiaCentralBlock) {
  if (!block) {
    return {
      error: 'no block',
    }
  }
  const lastBlockHeight = block.height || 0
  const response = await getSiaCentralBlocks({
    payload: {
      heights: range(lastBlockHeight - 4, lastBlockHeight),
    },
    config: {
      api: siaCentralApi,
    },
  })

  if (response.data?.blocks) {
    return {
      blocks: [block, ...response.data.blocks],
    }
  }
  return {
    error: response.data?.message,
  }
}
