import { SWRError } from '@siafoundation/react-core'
import { useEffect, useState } from 'react'
import { SWRResponse } from 'swr'

export function useHasFetched<Response>(
  response: SWRResponse<Response, SWRError>
) {
  const [hasFetched, setHasFetched] = useState(false)
  useEffect(() => {
    if (!hasFetched && response.data) {
      setHasFetched(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.isValidating])

  return {
    isLoading: response.isValidating,
    hasFetched,
  }
}
