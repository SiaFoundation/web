import { useActiveSiascanExchangeRate } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useAdminContract as useIndexContract } from '@siafoundation/indexd-react'
import { ContractData } from './types'
import { useAppSettings } from '@siafoundation/react-core'
import { transformContract } from './transform'
import { useHost } from '../Hosts/useHost'

export function useContract(contractId?: string) {
  const rawContract = useIndexContract({
    disabled: !contractId,
    params: {
      contractid: contractId || '',
    },
  })
  const hostKey = rawContract.data?.hostKey
  const host = useHost(hostKey)
  const exchangeRate = useActiveSiascanExchangeRate()
  const { settings } = useAppSettings()
  const contract = useMemo(() => {
    if (!rawContract.data) {
      return null
    }
    const datum: ContractData = transformContract(rawContract.data, {
      host,
      currencyDisplay: settings.currencyDisplay,
      exchange: exchangeRate.currency &&
        exchangeRate.rate && {
          currency: exchangeRate.currency,
          rate: exchangeRate.rate,
        },
    })
    return datum
  }, [
    rawContract.data,
    host,
    exchangeRate.currency,
    exchangeRate.rate,
    settings.currencyDisplay,
  ])

  return {
    contract,
    host,
  }
}
