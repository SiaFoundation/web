import { SiaCentralBlock } from './types'

export type SiaCentralBlockParams = {
  id: string
}
export type SiaCentralBlockPayload = void
export type SiaCentralBlockResponse = {
  message: string
  block: SiaCentralBlock
}
