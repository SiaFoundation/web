import { runFetch } from './fetch'
import { SiaCentralBlock, api } from './types'

export type SiaCentralBlockParams = {
  id: string
}

export type SiaCentralBlockResponse = {
  message: string
  block: SiaCentralBlock
}

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
