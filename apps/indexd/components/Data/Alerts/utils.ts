import { AlertData } from './types'

export function getAlertTypeLabel(alert: AlertData) {
  if (alert.data?.type === 'lostSectors') {
    return 'Lost sectors'
  }
  return 'Unknown'
}
