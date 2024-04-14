import { runFetch } from './fetch'
import {
  api,
  SiaCentralSearchParams,
  SiaCentralSearchResponse,
} from '@siafoundation/sia-central-types'

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
