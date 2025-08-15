import { AlertSeverity } from '@siafoundation/indexd-types'

export type AlertType = 'lostSectors' | 'unknown'

export type AlertDataLostSectors = {
  type: 'lostSectors'
  hostKeys: string[]
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
  data?: AlertDataLostSectors | AlertDataUnknown
  timestamp: string
  displayFields: {
    timestamp: string
  }
}
