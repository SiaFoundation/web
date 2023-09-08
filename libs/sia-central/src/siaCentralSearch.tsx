import { runFetch } from './fetch'
import {
  SiaCentralBlock,
  SiaCentralContract,
  SiaCentralHost,
  SiaCentralTransaction,
  SiaCentralUnlockHash,
  api,
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

export async function getSiaCentralSearch(args: {
  params: SiaCentralSearchParams
  config?: {
    api: string
  }
}) {
  const { params, config } = args
  return runFetch<SiaCentralSearchResponse>(
    `${config?.api || api}/explorer/search/${params.query}`
  )
}
