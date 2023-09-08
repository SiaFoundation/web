import { api, SiaCentralTransaction } from './types'
import { runFetch } from './fetch'

export type SiaCentralTransactionParams = {
  id: string
}

export type SiaCentralTransactionResponse = {
  message: string
  transaction: SiaCentralTransaction
}

export async function getSiaCentralTransaction(args: {
  params: SiaCentralTransactionParams
  config?: {
    api: string
  }
}) {
  const { params, config } = args
  return runFetch<SiaCentralTransactionResponse>(
    `${config?.api || api}/explorer/transactions/${params.id}`
  )
}
