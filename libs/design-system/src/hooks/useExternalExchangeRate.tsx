import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { minutesInMilliseconds } from '@siafoundation/units'
import {
  CurrencyId,
  RequestConfig,
  useAppSettings,
} from '@siafoundation/react-core'
import { useExchangeRate } from '@siafoundation/explored-react'

const swrConfigDefaults = {
  revalidateOnFocus: false,
  refreshInterval: minutesInMilliseconds(5),
  dedupingInterval: minutesInMilliseconds(5),
}

export function useSiascanExchangeRate({
  currency,
  config,
  disabled,
  api = 'https://api.siascan.com',
}: {
  currency?: CurrencyId
  config?: RequestConfig<void, number>
  disabled?: boolean
  api?: string
}) {
  const { settings, currencyOptions } = useAppSettings()
  const rate = useExchangeRate({
    params: {
      currency: currency ?? 'usd',
    },
    api,
    config: {
      ...config,
      swr: {
        ...swrConfigDefaults,
        ...config?.swr,
      },
    },
    disabled: !settings.siascan || !currency || disabled,
  })
  return useMemo(() => {
    return {
      rate: rate.data ? new BigNumber(rate.data) : undefined,
      error: rate.error,
      isValidating: rate.isValidating,
      isLoading: rate.isLoading,
      currency: currencyOptions.find((i) => i.id === currency),
    }
  }, [
    rate.data,
    rate.error,
    rate.isValidating,
    rate.isLoading,
    currencyOptions,
    currency,
  ])
}

export function useActiveSiascanExchangeRate({
  config,
  disabled,
  api = 'https://api.siascan.com',
}: {
  config?: RequestConfig<void, number>
  disabled?: boolean
  api?: string
} = {}) {
  const { settings } = useAppSettings()
  return useSiascanExchangeRate({
    currency: settings.currency.id,
    config,
    disabled,
    api,
  })
}

export function useDaemonExplorerExchangeRate({
  currency,
  config,
  disabled,
}: {
  currency?: CurrencyId
  config?: RequestConfig<void, number>
  disabled?: boolean
}) {
  const {
    daemonExplorer: { enabled, api },
    currencyOptions,
  } = useAppSettings()
  const rate = useExchangeRate({
    params: {
      currency: currency ?? 'usd',
    },
    disabled: !enabled || disabled || !currency,
    api,
    config: {
      ...config,
      swr: {
        ...swrConfigDefaults,
        ...config?.swr,
      },
    },
  })
  return useMemo(() => {
    return {
      rate: rate.data ? new BigNumber(rate.data) : undefined,
      error: rate.error,
      isValidating: rate.isValidating,
      isLoading: rate.isLoading,
      currency: currencyOptions.find((i) => i.id === currency),
    }
  }, [
    rate.data,
    rate.error,
    rate.isValidating,
    rate.isLoading,
    currencyOptions,
    currency,
  ])
}

export function useActiveDaemonExplorerExchangeRate({
  config,
  disabled,
}: {
  config?: RequestConfig<void, number>
  disabled?: boolean
} = {}) {
  const { settings } = useAppSettings()
  return useDaemonExplorerExchangeRate({
    currency: settings.currency.id,
    config,
    disabled,
  })
}

// useExternalExchangeRate is a generic hook for getting the exchange rate.
// This hook checks for whether the daemon has an explorer configuration
// endpoint and if so uses that to check whether the feature is enabled or not.
// Otherwise it falls back to the siascan api and uses the appSettings siascan
// flag to check whether the feature is enabled.
// This hook is used in design-system components that get used in both types of contexts.
export function useExternalExchangeRate({
  currency,
  config,
  disabled,
}: {
  currency?: CurrencyId
  config?: RequestConfig<void, number>
  disabled?: boolean
}) {
  const { daemonExplorer } = useAppSettings()
  const daemonRate = useDaemonExplorerExchangeRate({
    currency,
    config,
    disabled: !daemonExplorer.enabled || disabled,
  })

  const siascanRate = useSiascanExchangeRate({
    currency,
    config,
    disabled: daemonExplorer.enabled || disabled,
  })

  return daemonExplorer.isSupported ? daemonRate : siascanRate
}

// useExternalActiveExchangeRate is a generic hook for getting the active exchange rate.
// This hook checks for whether the daemon has an explorer configuration
// endpoint and if so uses that to check whether the feature is enabled or not.
// Otherwise it falls back to the siascan api and uses the appSettings siascan
// flag to check whether the feature is enabled.
// This hook is used in design-system components that get used in both types of contexts.
export function useExternalActiveExchangeRate({
  config,
  disabled,
}: {
  config?: RequestConfig<void, number>
  disabled?: boolean
} = {}) {
  const { settings } = useAppSettings()
  return useExternalExchangeRate({
    currency: settings.currency.id,
    config,
    disabled,
  })
}
