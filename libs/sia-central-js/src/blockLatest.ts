import { runFetch } from './fetch'
import {
  api,
  SiaCentralBlockLatestResponse,
} from '@siafoundation/sia-central-types'

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
