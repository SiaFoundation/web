import { useMemo } from 'react'
import { useAdminConnectKeys } from '@siafoundation/indexd-react'
import { transformKey } from './transform'
import { useKeysParams } from './useKeysParams'

export function useKeys() {
  const { limit, offset } = useKeysParams()
  const rawKeys = useAdminConnectKeys({
    params: {
      limit,
      offset,
    },
  })
  const keys = useMemo(
    () =>
      rawKeys.data?.map((key) => {
        return transformKey(key)
      }) || [],
    [rawKeys.data],
  )

  return keys
}
