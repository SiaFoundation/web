import { useGetExternal } from './useGet'
import { SWROptions } from './types'
import { useSettings } from './useSettings'

type SiaCentralExchangeRateGET = {
  message: string
  type: string
  rates: {
    sc: {
      bch: string
      btc: string
      cad: string
      cny: string
      eth: string
      eur: string
      gbp: string
      jpy: string
      ltc: string
      rub: string
      scp: string
      sf: string
      usd: string
    }
  }
  timestamp: string
}

const api = 'https://api.siacentral.com/v2'

export function useSiaCentralMarketExchangeRate(
  options?: SWROptions<SiaCentralExchangeRateGET>
) {
  const { settings } = useSettings()
  return useGetExternal(api + '/market/exchange-rate?currencies=sc', {
    ...options,
    disabled: options?.disabled || !settings.siaCentral,
  })
}

type SiaCentralNetworkAveragesGET = {
  message: string
  type: string
  settings: {
    max_download_batch_size: number
    max_duration: number
    max_revise_batch_size: number
    remaining_storage: number
    sector_size: number
    total_storage: number
    window_size: number
    revision_number: number
    base_rpc_price: string
    collateral: string
    max_collateral: string
    contract_price: string
    download_price: string
    sector_access_price: string
    storage_price: string
    upload_price: string
  }
  price_table: {
    uid: string
    validity: number
    hostblockheight: number
    updatepricetablecost: string
    accountbalancecost: string
    fundaccountcost: string
    latestrevisioncost: string
    subscriptionmemorycost: string
    subscriptionnotificationcost: string
    initbasecost: string
    memorytimecost: string
    downloadbandwidthcost: string
    uploadbandwidthcost: string
    dropsectorsbasecost: string
    dropsectorsunitcost: string
    hassectorbasecost: string
    readbasecost: string
    readlengthcost: string
    renewcontractcost: string
    revisionbasecost: string
    swapsectorcost: string
    writebasecost: string
    writelengthcost: string
    writestorecost: string
    txnfeeminrecommended: string
    txnfeemaxrecommended: string
    contractprice: string
    collateralcost: string
    maxcollateral: string
    maxduration: number
    windowsize: number
    registryentriesleft: number
    registryentriestotal: number
  }
  benchmarks: {
    contract_time: number
    upload_time: number
    download_time: number
    data_size: number
  }
  benchmarks_rhp2: {
    contract_time: number
    upload_time: number
    download_time: number
    data_size: number
  }
}

export function useSiaCentralHostsNetworkAverages(
  options?: SWROptions<SiaCentralNetworkAveragesGET>
) {
  const { settings } = useSettings()
  return useGetExternal(api + '/hosts/network/averages', {
    ...options,
    disabled: options?.disabled || !settings.siaCentral,
  })
}
