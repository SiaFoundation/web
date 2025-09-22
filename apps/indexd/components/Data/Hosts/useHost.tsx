import {
  useActiveDaemonExplorerExchangeRate,
  useDaemonExplorerHost,
  useRemoteData,
} from '@siafoundation/design-system'
import { useAdminHost } from '@siafoundation/indexd-react'
import { transformHost } from './transform'
import {
  AppSettings,
  CurrencyOption,
  useAppSettings,
} from '@siafoundation/react-core'
import { HostData } from './types'
import { Host } from '@siafoundation/indexd-types'

export function useHost(publicKey?: string) {
  const geo = useDaemonExplorerHost({
    disabled: !publicKey,
    params: {
      id: publicKey || '',
    },
  })
  const host = useAdminHost({
    disabled: !publicKey,
    params: {
      hostkey: publicKey || '',
    },
  })
  const exchangeRate = useActiveDaemonExplorerExchangeRate()
  const { settings } = useAppSettings()
  return useRemoteData(
    {
      host,
    },
    ({ host }) => transformDown({ host, geo, exchangeRate, settings }),
  )
}

function transformDown({
  host,
  geo,
  exchangeRate,
  settings,
}: {
  host: Host
  geo: {
    isLoading: boolean
    isValidating: boolean
    data?: {
      location: {
        countryCode: string
        latitude: number
        longitude: number
      }
    }
  }
  exchangeRate: {
    currency: CurrencyOption | undefined
    rate: BigNumber | undefined
  }
  settings: AppSettings
}): HostData {
  const datum = transformHost({
    host,
    location: geo.data?.location,
    currencyDisplay: settings.currencyDisplay,
    exchange: exchangeRate.currency &&
      exchangeRate.rate && {
        currency: exchangeRate.currency,
        rate: exchangeRate.rate,
      },
  })
  return datum
}
