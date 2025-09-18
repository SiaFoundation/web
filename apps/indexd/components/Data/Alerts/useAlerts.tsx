import { useAdminAlerts } from '@siafoundation/indexd-react'
import { transformAlert } from './transform'
import { useAlertsParams } from './useAlertsParams'
import { useRemoteDataset } from '@siafoundation/design-system'

export function useAlerts() {
  const { limit, offset } = useAlertsParams()
  const alerts = useAdminAlerts({
    params: {
      limit,
      offset,
    },
  })
  return useRemoteDataset(
    {
      alerts,
    },
    ({ alerts }) => alerts.map(transformAlert),
    {
      offset,
    },
  )
}
