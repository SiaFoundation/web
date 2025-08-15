import { useMemo } from 'react'
import { useAdminAlerts } from '@siafoundation/indexd-react'
import { transformAlert } from './transform'
import { useAlertsParams } from './useAlertsParams'

export function useAlerts() {
  const { limit, offset } = useAlertsParams()
  const rawAlerts = useAdminAlerts({
    params: {
      limit,
      offset,
    },
  })
  const alerts = useMemo(
    () =>
      rawAlerts.data?.map((alert) => {
        return transformAlert(alert)
      }) || [],
    [rawAlerts.data],
  )

  return alerts
}
