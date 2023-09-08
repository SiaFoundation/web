import { runFetch } from './fetch'
import { SiaCentralHost, api } from './types'

export type SiaCentralHostParams = {
  id: string
}

export type SiaCentralHostResponse = {
  message: string
  type: string
  host: SiaCentralHost
}

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
