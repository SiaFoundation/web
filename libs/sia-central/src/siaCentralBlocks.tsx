import { api, SiaCentralBlock } from './types'
import { runFetch } from './fetch'

export type SiaCentralBlocksResponse = {
  message: string
  blocks: SiaCentralBlock[]
}

export type SiaCentralBlocksPayload = {
  block_ids?: number[]
  heights?: number[]
}

export async function getSiaCentralBlocks(args: {
  payload: SiaCentralBlocksPayload
  config?: {
    api: string
  }
}) {
  const { payload, config } = args
  return runFetch<SiaCentralBlocksResponse>(
    `${config?.api || api}/explorer/blocks`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  )
}
