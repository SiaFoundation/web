import type { SiaCentralHost } from './types'

export type SiaCentralHostParams = {
  id: string
}
export type SiaCentralHostPayload = void
export type SiaCentralHostResponse = {
  message: string
  type: string
  host: SiaCentralHost
}
