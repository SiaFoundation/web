import { runFetch } from './fetch'
import {
  api,
  SiaCentralHostParams,
  SiaCentralHostResponse,
} from '@siafoundation/sia-central-types'

export async function getSiaCentralHost(args: {
  params: SiaCentralHostParams
  config?: {
    api: string
  }
}) {
  const { params, config } = args
  return runFetch<SiaCentralHostResponse>(
    `${config?.api || api}/hosts/${params.id}`
  )
}
