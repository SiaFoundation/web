import axios from 'axios'
import { buildErrorResponse500 } from './error'
import { AsyncDataSourceResponse } from './types'

type SiaCentralHostsNetworkMetrics = {
  totals: {
    remaining_registry_entries: number
    total_registry_entries: number
    remaining_storage: number
    total_storage: number
    active_hosts: number
    total_hosts: number
  }
}

export async function getSiaCentralHostsNetworkMetrics(): AsyncDataSourceResponse<SiaCentralHostsNetworkMetrics> {
  try {
    const response = await axios.get(
      'https://api.siacentral.com/v2/hosts/network/metrics',
      {
        timeout: 10_000,
      }
    )
    const result = response.data
    return {
      status: 200,
      data: result,
    }
  } catch (e) {
    console.log(e)
    return buildErrorResponse500()
  }
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

export async function getSiaCentralHosts(): AsyncDataSourceResponse<{
  message: string
  count: number
  total: number
  type: string
  hosts: SiaCentralHost[]
}> {
  try {
    const response = await axios.get(
      'https://api.siacentral.com/v2/hosts/list?showinactive=false&sort=download_speed&dir=desc&protocol=rhp3&page=0&limit=300',
      {
        timeout: 10_000,
      }
    )
    const result = response.data
    return {
      status: 200,
      data: result,
    }
  } catch (e) {
    console.log(e)
    return buildErrorResponse500()
  }
}

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

export async function getSiaCentralExchangeRates(): AsyncDataSourceResponse<SiaCentralExchangeRateGET> {
  try {
    const response = await axios.get(
      'https://api.siacentral.com/v2/market/exchange-rate?currencies=sc',
      {
        timeout: 10_000,
      }
    )
    const result = response.data
    return {
      status: 200,
      data: result,
    }
  } catch (e) {
    console.log(e)
    return buildErrorResponse500()
  }
}
