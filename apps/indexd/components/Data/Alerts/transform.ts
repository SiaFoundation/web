import { Alert } from '@siafoundation/indexd-types'
import {
  AlertData,
  AlertDataLostSectors,
  AlertDataStuckHosts,
  AlertDataUnknown,
  AlertType,
  StuckHost,
} from './types'

function getAlertType(alert: Alert): AlertType {
  if (alert.data && 'hostKeys' in alert.data) return 'lostSectors'
  if (alert.data && 'hosts' in alert.data) return 'stuckHosts'
  return 'unknown'
}

function getAlertData(
  type: AlertType,
  data: Alert['data']
): AlertDataLostSectors | AlertDataStuckHosts | AlertDataUnknown | undefined {
  if (!data) return undefined
  if (type === 'lostSectors') {
    return {
      type: 'lostSectors',
      hostKeys: data.hostKeys as string[],
      hint: data.hint as string,
    }
  }
  if (type === 'stuckHosts') {
    return {
      type: 'stuckHosts',
      hosts: data.hosts as StuckHost[],
      hint: data.hint as string,
    }
  }
  return { type: 'unknown', ...data }
}

export function transformAlert(alert: Alert): AlertData {
  const type = getAlertType(alert)
  const data = getAlertData(type, alert.data)

  const datum: AlertData = {
    id: alert.id,
    severity: alert.severity,
    message: alert.message,
    type,
    data,
    timestamp: alert.timestamp,
    displayFields: {
      timestamp: Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(alert.timestamp)),
    },
  }
  return datum
}
