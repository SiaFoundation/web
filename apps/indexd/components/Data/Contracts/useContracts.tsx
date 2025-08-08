import { useActiveSiascanExchangeRate } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useContracts as useIndexContracts } from '@siafoundation/indexd-react'
import { ContractData } from './types'
import { useAppSettings } from '@siafoundation/react-core'
import { transformContract } from './transform'
import { useHosts } from '../Hosts/useHosts'

export function useContracts() {
  const rawContracts = useIndexContracts({
    params: {
      limit: 500,
    },
  })
  const hosts = useHosts()
  const exchangeRate = useActiveSiascanExchangeRate()
  const { settings } = useAppSettings()
  const contracts = useMemo(
    () =>
      rawContracts.data?.map((contract) => {
        const host = hosts.find((h) => h.id === contract.hostKey)
        const datum: ContractData = transformContract(contract, {
          host,
          currencyDisplay: settings.currencyDisplay,
          exchange: exchangeRate.currency &&
            exchangeRate.rate && {
              currency: exchangeRate.currency,
              rate: exchangeRate.rate,
            },
        })
        return datum
      }) || [],
    [
      rawContracts.data,
      exchangeRate.rate,
      exchangeRate.currency,
      hosts,
      settings.currencyDisplay,
    ],
  )

  return contracts
}
