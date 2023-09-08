import { api, SiaCentralBlock } from './types'
import { runFetch } from './fetch'

export type SiaCentralBlockLatestResponse = {
  message: string
  block: Omit<SiaCentralBlock, 'transactions'>
}

export async function getSiaCentralBlockLatest(args?: {
  config?: {
    api: string
  }
}) {
  const { config } = args || {}
  return runFetch<SiaCentralBlockLatestResponse>(
    `${config?.api || api}/explorer/blocks`
  )
}
