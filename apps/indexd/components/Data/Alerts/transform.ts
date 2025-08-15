import { Alert } from '@siafoundation/indexd-types'
import { AlertData, AlertDataLostSectors, AlertDataUnknown } from './types'

export function transformAlert(alert: Alert): AlertData {
  const type =
    alert.data && 'hostKeys' in alert.data ? 'lostSectors' : 'unknown'
  const data =
    type === 'lostSectors'
      ? ({
          type: 'lostSectors',
          hostKeys: alert.data?.hostKeys as string[],
          hint: alert.data?.hint as string,
        } as AlertDataLostSectors)
      : ({ type: 'unknown', ...alert.data } as AlertDataUnknown)

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
