import {
  useActiveDaemonExplorerExchangeRate,
  useRemoteData,
} from '@siafoundation/design-system'
import { useAdminContract } from '@siafoundation/indexd-react'
import {
  CurrencyDisplayPreference,
  CurrencyOption,
  useAppSettings,
} from '@siafoundation/react-core'
import { transformContract } from './transform'
import { useHost } from '../Hosts/useHost'
import { Contract } from '@siafoundation/indexd-types'
import { HostData } from '../Hosts/types'

export function useContract(contractId?: string) {
  const contract = useAdminContract({
    disabled: !contractId,
    params: {
      contractid: contractId || '',
    },
  })
  const hostKey = contract.data?.hostKey
  const host = useHost(hostKey)
  const exchangeRate = useActiveDaemonExplorerExchangeRate()
  const { settings } = useAppSettings()

  return useRemoteData(
    {
      contract,
      host,
    },
    ({ contract, host }) =>
      transformDown({
        contract,
        host,
        exchangeRate,
        currencyDisplay: settings.currencyDisplay,
      }),
  )
}

function transformDown({
  contract,
  host,
  exchangeRate,
  currencyDisplay,
}: {
  contract: Contract
  host: HostData
  exchangeRate: {
    currency: CurrencyOption | undefined
    rate: BigNumber | undefined
  }
  currencyDisplay: CurrencyDisplayPreference
}) {
  const contractData = transformContract({
    contract,
    currencyDisplay,
    exchange: exchangeRate.currency &&
      exchangeRate.rate && {
        currency: exchangeRate.currency,
        rate: exchangeRate.rate,
      },
  })
  return {
    contract: contractData,
    host,
  }
}
