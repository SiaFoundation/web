import { useAdminConnectKeys } from '@siafoundation/indexd-react'
import { useKeysParams } from './useKeysParams'
import { transformDownData } from '../../../lib/connectKey'
import { useRemoteDataset } from '@siafoundation/design-system'

export function useKeys() {
  const { limit, offset } = useKeysParams()
  const keys = useAdminConnectKeys({
    params: {
      limit,
      offset,
    },
  })
  return useRemoteDataset(
    {
      keys,
    },
    ({ keys }) => keys.map(transformDownData),
    {
      offset,
    },
  )
}
