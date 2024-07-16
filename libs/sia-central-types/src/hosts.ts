import type { SiaCentralHost } from './types'

export type SiaCentralHostsParams = {
  limit?: number
  page?: number
  showinactive?: boolean
  sort?: string
  dir?: 'asc' | 'desc'
  protocol?: string
}
export type SiaCentralHostsPayload = void
export type SiaCentralHostsResponse = {
  message: string
  count: number
  total: number
  type: string
  hosts: SiaCentralHost[]
}
