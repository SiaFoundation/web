import { runFetch } from './fetch'
import { SiaCentralSiafundOutput, SiaCentralTransaction, api } from './types'

export type SiaCentralAddressParams = {
  id: string
}

export type SiaCentralAddressResponse = {
  message: 'successfully got transactions'
  type: 'success'
  transactions?: SiaCentralTransaction[]
  unconfirmed_transactions?: SiaCentralTransaction[]
  unspent_siacoins: string
  unspent_siafunds: string
  unspent_siacoin_outputs?: {
    output_id: string
    unlock_hash: string
    source: string
    maturity_height: number
    block_height: number
    value: string
  }[]
  unspent_siafund_outputs?: SiaCentralSiafundOutput[]
}

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
