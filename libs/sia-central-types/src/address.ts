import type { SiaCentralSiafundOutput, SiaCentralTransaction } from './types'

export type SiaCentralAddressParams = {
  id: string
}
export type SiaCentralAddressPayload = void
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
