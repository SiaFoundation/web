import { AlertData } from './types'

export function getAlertTypeLabel(alert: AlertData) {
  if (alert.data?.type === 'lostSectors') {
    return 'Lost sectors'
  }
  if (alert.data?.type === 'stuckHosts') {
    return 'Stuck hosts'
  }
  return 'Unknown'
}
