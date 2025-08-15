import { useActiveDaemonExplorerExchangeRate } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useAdminContracts as useIndexContracts } from '@siafoundation/indexd-react'
import { ContractData } from './types'
import { useAppSettings } from '@siafoundation/react-core'
import { transformContract } from './transform'
import { AdminContractsParams } from '@siafoundation/indexd-types'
import { useExplorerHosts } from '../useExplorerHosts'
import { useContractsParams } from './useContractsParams'

export function useContracts() {
  const { columnFilters, offset, limit } = useContractsParams()
  const params = useMemo(() => {
    const filters: AdminContractsParams = { offset, limit }
    const good = columnFilters.find((f) => f.id === 'status')?.value
    if (good !== undefined) {
      filters.good = good
    }
    const revisable = columnFilters.find((f) => f.id === 'revisable')?.value
    if (revisable !== undefined) {
      filters.revisable = revisable
    }
    return filters
  }, [columnFilters, offset, limit])
  const rawContracts = useIndexContracts({
    params,
  })
  const geo = useExplorerHosts()
  const exchangeRate = useActiveDaemonExplorerExchangeRate()
  const { settings } = useAppSettings()
  const contracts = useMemo(
    () =>
      rawContracts.data?.map((contract) => {
        const host = geo.data?.find((h) => h.publicKey === contract.hostKey)
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
      geo.data,
      settings.currencyDisplay,
    ],
  )

  return contracts
}
