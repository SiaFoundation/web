import { SiaCentralTransaction } from './types'

export type SiaCentralTransactionParams = {
  id: string
}

export type SiaCentralTransactionResponse = {
  message: string
  type?: 'error'
  transaction: SiaCentralTransaction
}
