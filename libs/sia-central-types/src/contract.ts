import { SiaCentralContract } from './types'

export type SiaCentralContractParams = {
  id: string
}

export type SiaCentralContractResponse = {
  message: string
  contract: SiaCentralContract
}
