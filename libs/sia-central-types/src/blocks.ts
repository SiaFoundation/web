import { SiaCentralBlock } from './types'

export type SiaCentralBlocksParams = void
export type SiaCentralBlocksResponse = {
  message: string
  blocks: SiaCentralBlock[]
}
export type SiaCentralBlocksPayload = {
  block_ids?: number[]
  heights?: number[]
}
