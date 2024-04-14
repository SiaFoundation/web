import { SiaCentralHost } from './types'

export type SiaCentralHostsParams = {
  limit?: number
  page?: number
}

export type SiaCentralHostsResponse = {
  message: string
  count: number
  total: number
  type: string
  hosts: SiaCentralHost[]
}
