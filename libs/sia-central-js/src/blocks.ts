import {
  api,
  SiaCentralBlocksPayload,
  SiaCentralBlocksResponse,
} from '@siafoundation/sia-central-types'
import { runFetch } from './fetch'

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
