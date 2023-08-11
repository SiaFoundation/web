import { useGetSwr } from './useGet'
import { useAppSettings } from './useAppSettings'
import { HookArgsSwr } from './request'

export type SiaCentralExchangeRateGET = {
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
      aud: string
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
  args?: HookArgsSwr<void, SiaCentralExchangeRateGET>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/market/exchange-rate?currencies=sc',
    disabled: args?.disabled || !settings.siaCentral,
  })
}

type SiaCentralNetworkStats = {
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
  benchmarks_rhp2?: {
    contract_time: number
    upload_time: number
    download_time: number
    data_size: number
  }
}

type SiaCentralNetworkAveragesGET = {
  message: string
  type: string
} & SiaCentralNetworkStats

export function useSiaCentralHostsNetworkAverages(
  args?: HookArgsSwr<void, SiaCentralNetworkAveragesGET>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/hosts/network/averages',
    disabled: args?.disabled || !settings.siaCentral,
  })
}

type SiaCentralNetworkMetricsGET = {
  message: string
  type: string
  average: SiaCentralNetworkStats
  top: SiaCentralNetworkStats
  bottom: SiaCentralNetworkStats
  totals: {
    remaining_registry_entries: number
    total_registry_entries: number
    remaining_storage: number
    total_storage: number
    active_hosts: number
    total_hosts: number
  }
}

export function useSiaCentralHostsNetworkMetrics(
  args?: HookArgsSwr<void, SiaCentralNetworkMetricsGET>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/hosts/network/metrics',
    disabled: args?.disabled || !settings.siaCentral,
  })
}

export type SiaCentralHost = {
  net_address: string
  public_key: string
  version: string
  estimated_uptime: number
  online: boolean
  first_seen_height: number
  first_seen_timestamp: string
  last_scan: string
  last_success_scan: string
  country_code: string
  location: [number, number]
  settings: {
    netaddress: string
    version: string
    accepting_contracts: boolean
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
    ephemeral_account_expiry: number
    max_ephemeral_account_balance: string
    sia_mux_port: string
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
  benchmark: {
    contract_time: number
    upload_time: number
    download_time: number
    data_size: number
    last_attempt: string
    last_successful: string
    error?: string
  }
}

type SiaCentralHostsResponse = {
  message: string
  count: number
  total: number
  type: string
  hosts: SiaCentralHost[]
}

export function useSiaCentralHosts(
  args?: HookArgsSwr<void, SiaCentralHostsResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route:
      '/hosts/list?showinactive=false&sort=download_speed&dir=desc&protocol=rhp3&page=0&limit=1000',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
