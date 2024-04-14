import { runFetch } from './fetch'
import {
  api,
  SiaCentralContractParams,
  SiaCentralContractResponse,
} from '@siafoundation/sia-central-types'

export async function getSiaCentralContract(args: {
  params: SiaCentralContractParams
  config?: {
    api: string
  }
}) {
  const { params, config } = args
  return runFetch<SiaCentralContractResponse>(
    `${config?.api || api}/explorer/contracts/${params.id}`
  )
}
