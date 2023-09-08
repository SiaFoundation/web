import { runFetch } from './fetch'
import { api, SiaCentralContract } from './types'

export type SiaCentralContractParams = {
  id: string
}

export type SiaCentralContractResponse = {
  message: string
  contract: SiaCentralContract
}

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
