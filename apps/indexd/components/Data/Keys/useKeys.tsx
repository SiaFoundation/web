import { useMemo } from 'react'
import { useAdminConnectKeys } from '@siafoundation/indexd-react'
import { useKeysParams } from './useKeysParams'
import { transformDownData } from '../../../lib/connectKey'

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
        return transformDownData(key)
      }) || [],
    [rawKeys.data],
  )

  return keys
}
