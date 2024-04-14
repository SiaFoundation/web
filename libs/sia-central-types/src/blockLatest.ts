import { SiaCentralBlock } from './types'

export type SiaCentralBlockLatestResponse = {
  message: string
  block: Omit<SiaCentralBlock, 'transactions'>
}
