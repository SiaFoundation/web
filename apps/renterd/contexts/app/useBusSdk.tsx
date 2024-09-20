import { useEffect, useState } from 'react'
import { useAppSettings } from '@siafoundation/react-core'
import { Bus } from '@siafoundation/renterd-js'

export function useBusSdk() {
  const [bus, setBus] = useState<ReturnType<typeof Bus> | null>(null)
  const {
    settings: { api, password },
  } = useAppSettings()

  useEffect(() => {
    setBus(
      Bus({
        api: `${api}/api`,
        password,
      })
    )
  }, [api, password])

  return bus
}
