import { SiaCentralHost } from './types'

export type SiaCentralHostParams = {
  id: string
}

export type SiaCentralHostResponse = {
  message: string
  type: string
  host: SiaCentralHost
}
