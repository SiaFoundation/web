import { useAdminQuotas } from '@siafoundation/indexd-react'
import { useQuotasParams } from './useQuotasParams'
import { transformDownData } from '../../../lib/quota'
import { useRemoteDataset } from '@siafoundation/design-system'

export function useQuotas() {
  const { limit, offset } = useQuotasParams()
  const quotas = useAdminQuotas({
    params: {
      limit,
      offset,
    },
  })
  return useRemoteDataset(
    {
      quotas,
    },
    ({ quotas }) => quotas.map(transformDownData),
    {
      offset,
    },
  )
}
