import type { SiaCentralTransaction } from './types'

export type SiaCentralTransactionParams = {
  id: string
}
export type SiaCentralTransactionPayload = void
export type SiaCentralTransactionResponse = {
  message: string
  type?: 'error'
  transaction: SiaCentralTransaction
}
