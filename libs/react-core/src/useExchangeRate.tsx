import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { minutesInMilliseconds } from '@siafoundation/units'
import { CurrencyId } from './appSettings/useExternalData/currency'
import { RequestConfig } from './request'
import { useAppSettings } from './appSettings'
import { useGetSwr } from './useGet'

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
  const rate = useGetSwr<{ currency?: CurrencyId }, number>({
    params: {
      currency,
    },
    api,
    route: '/exchange-rate/siacoin/:currency',
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

export function useActiveCurrencySiascanExchangeRate({
  config,
  disabled,
  api,
}: {
  config?: RequestConfig<void, number>
  disabled?: boolean
  api?: string
}) {
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
  const rate = useGetSwr<{ currency?: CurrencyId }, number>({
    params: {
      currency,
    },
    disabled: !enabled || disabled || !currency,
    api,
    route: '/exchange-rate/siacoin/:currency',
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

export function useActiveCurrencyDaemonExplorerExchangeRate({
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

export function useExchangeRate({
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

  return daemonExplorer.enabled ? daemonRate : siascanRate
}

export function useActiveExchangeRate({
  config,
  disabled,
}: {
  config?: RequestConfig<void, number>
  disabled?: boolean
} = {}) {
  const { settings } = useAppSettings()
  return useExchangeRate({
    currency: settings.currency.id,
    config,
    disabled,
  })
}
