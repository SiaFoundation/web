import { runFetch } from './fetch'
import {
  api,
  SiaCentralBlockParams,
  SiaCentralBlockResponse,
} from '@siafoundation/sia-central-types'

export async function getSiaCentralBlock(args: {
  params: SiaCentralBlockParams
  config?: {
    api: string
  }
}) {
  const { params, config } = args
  return runFetch<SiaCentralBlockResponse>(
    `${config?.api || api}/explorer/blocks/${params.id}`
  )
}
