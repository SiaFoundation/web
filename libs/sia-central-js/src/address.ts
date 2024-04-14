import { runFetch } from './fetch'
import {
  api,
  SiaCentralAddressParams,
  SiaCentralAddressResponse,
} from '@siafoundation/sia-central-types'

export async function getSiaCentralAddress(args: {
  params: SiaCentralAddressParams
  config?: {
    api: string
  }
}) {
  const { params, config } = args
  return runFetch<SiaCentralAddressResponse>(
    `${config?.api || api}/wallet/addresses/${params.id}`
  )
}
