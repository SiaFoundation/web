import { useAdminObjectsBlocklist } from '@siafoundation/indexd-react'
import { useRemoteDataset } from '@siafoundation/design-system'
import { useBlockedObjectsParams } from './useBlockedObjectsParams'
import { transformBlockedObject } from './transform'

export function useBlockedObjects() {
  const { limit, offset } = useBlockedObjectsParams()
  const blocklist = useAdminObjectsBlocklist({
    params: {
      limit,
      offset,
    },
  })
  return useRemoteDataset(
    {
      blocklist,
    },
    ({ blocklist }) => blocklist.map(transformBlockedObject),
    {
      offset,
    },
  )
}
