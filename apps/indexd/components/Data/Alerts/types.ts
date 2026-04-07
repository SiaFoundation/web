import { AlertSeverity } from '@siafoundation/indexd-types'

export type AlertType = 'lostSectors' | 'stuckHosts' | 'unknown'

export type AlertDataLostSectors = {
  type: 'lostSectors'
  hostKeys: string[]
  hint: string
}

export type StuckHost = {
  publicKey: string
  stuckSince: string
  unpinnedSectors: number
}

export type AlertDataStuckHosts = {
  type: 'stuckHosts'
  hosts: StuckHost[]
  hint: string
}

export type AlertDataUnknown = {
  type: 'unknown'
  [key: string]: unknown
}

export type AlertData = {
  id: string
  severity: AlertSeverity
  message: string
  type: AlertType
  data?: AlertDataLostSectors | AlertDataStuckHosts | AlertDataUnknown
  timestamp: string
  displayFields: {
    timestamp: string
  }
}
