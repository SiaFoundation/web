import type { SiaCentralBlock } from './types'

export type SiaCentralBlockLatestParams = void
export type SiaCentralBlockLatestPayload = void
export type SiaCentralBlockLatestResponse = {
  message: string
  type: string
  block?: Omit<SiaCentralBlock, 'transactions'>
}
