import {
  SiaCentralBlock,
  SiaCentralContract,
  SiaCentralHost,
  SiaCentralTransaction,
  SiaCentralUnlockHash,
} from './types'

export type SiaCentralSearchParams = {
  query: string
}

export type SiaCentralSearchResponse = {
  message: string
  blocks?: SiaCentralBlock[]
  contracts?: SiaCentralContract[]
  transactions?: SiaCentralTransaction[]
  hosts?: SiaCentralHost[]
  unlock_hashes?: SiaCentralUnlockHash[]
}
