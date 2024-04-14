import {
  api,
  SiaCentralTransactionParams,
  SiaCentralTransactionResponse,
} from '@siafoundation/sia-central-types'
import { runFetch } from './fetch'

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
