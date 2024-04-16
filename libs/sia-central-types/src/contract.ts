import { SiaCentralContract } from './types'

export type SiaCentralContractParams = {
  id: string
}
export type SiaCentralContractPayload = void
export type SiaCentralContractResponse = {
  message: string
  contract: SiaCentralContract
}
