import { useAdminAlerts } from '@siafoundation/indexd-react'
import { transformAlert } from './transform'
import { useAlertsParams } from './useAlertsParams'
import { useRemoteDataset } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { AdminAlertsParams, AlertSeverity } from '@siafoundation/indexd-types'

export function useAlerts() {
  const { limit, offset, columnFilters } = useAlertsParams()
  const params = useMemo(() => {
    const params: AdminAlertsParams = { limit, offset }
    const severity = columnFilters.find((f) => f.id === 'severity')?.value
    if (severity) {
      params.severity = severity as AlertSeverity
    }
    return params
  }, [columnFilters, limit, offset])
  const alerts = useAdminAlerts({ params })
  return useRemoteDataset(
    {
      alerts,
    },
    ({ alerts }) => alerts.map(transformAlert),
    {
      offset,
      filters: columnFilters,
    },
  )
}
