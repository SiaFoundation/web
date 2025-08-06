import {
  useActiveSiascanExchangeRate,
  useSiascanHostsList,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import {
  useIndexdState,
  useContracts as useIndexContracts,
  useHosts as useIndexHosts,
} from '@siafoundation/indexd-react'
import { ContractData } from './types'
import { useAppSettings } from '@siafoundation/react-core'
import { transformContract } from './transform'

export function useContracts() {
  const state = useIndexdState()
  const geo = useSiascanHostsList({
    api:
      state.data?.network === 'mainnet'
        ? 'https://api.siascan.com'
        : 'https://api.siascan.com/zen',
    params: {
      sortBy: 'storage_price',
      dir: 'asc',
      limit: 1000,
    },
    payload: {
      online: true,
    },
  })
  const rawContracts = useIndexContracts({
    params: {
      limit: 500,
    },
  })
  const rawHosts = useIndexHosts({
    params: {
      limit: 500,
    },
  })
  const exchangeRate = useActiveSiascanExchangeRate()
  const exchange = useMemo(
    () =>
      exchangeRate.currency &&
      exchangeRate.rate && {
        currency: exchangeRate.currency,
        rate: exchangeRate.rate,
      },
    [exchangeRate.currency, exchangeRate.rate],
  )
  const { settings } = useAppSettings()
  const contracts = useMemo(
    () =>
      rawContracts.data?.map((contract) => {
        const host = rawHosts.data?.find(
          (h) => h.publicKey === contract.hostKey,
        )
        const location = geo.data?.find(
          (h) => h.publicKey === contract.hostKey,
        )?.location
        const datum: ContractData = transformContract(contract, {
          host,
          location,
          currencyDisplay: settings.currencyDisplay,
          exchange,
        })
        return datum
      }) || [],
    [
      rawContracts.data,
      exchange,
      geo.data,
      rawHosts.data,
      settings.currencyDisplay,
    ],
  )

  return contracts
}
