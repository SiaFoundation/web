import {
  defaultApi,
  SiaCentralAddressParams,
  SiaCentralAddressPayload,
  SiaCentralAddressResponse,
  SiaCentralBlockLatestParams,
  SiaCentralBlockLatestPayload,
  SiaCentralBlockLatestResponse,
  SiaCentralBlockParams,
  SiaCentralBlockPayload,
  SiaCentralBlockResponse,
  SiaCentralBlocksParams,
  SiaCentralBlocksPayload,
  SiaCentralBlocksResponse,
  SiaCentralContractParams,
  SiaCentralContractPayload,
  SiaCentralContractResponse,
  SiaCentralExchangeRatesParams,
  SiaCentralExchangeRatesPayload,
  SiaCentralExchangeRatesResponse,
  SiaCentralHostParams,
  SiaCentralHostPayload,
  SiaCentralHostResponse,
  SiaCentralHostsNetworkAveragesParams,
  SiaCentralHostsNetworkAveragesPayload,
  SiaCentralHostsNetworkAveragesResponse,
  SiaCentralHostsNetworkMetricsParams,
  SiaCentralHostsNetworkMetricsPayload,
  SiaCentralHostsNetworkMetricsResponse,
  SiaCentralHostsParams,
  SiaCentralHostsPayload,
  SiaCentralHostsResponse,
  SiaCentralSearchParams,
  SiaCentralSearchPayload,
  SiaCentralSearchResponse,
  SiaCentralTransactionParams,
  SiaCentralTransactionPayload,
  SiaCentralTransactionResponse,
} from '@siafoundation/sia-central-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function SiaCentral({ api }: { api: string } = { api: defaultApi }) {
  const axios = initAxios(api)
  return {
    address: buildRequestHandler<
      SiaCentralAddressParams,
      SiaCentralAddressPayload,
      SiaCentralAddressResponse
    >(axios, 'get', '/wallet/addresses/:id'),
    block: buildRequestHandler<
      SiaCentralBlockParams,
      SiaCentralBlockPayload,
      SiaCentralBlockResponse
    >(axios, 'get', '/explorer/blocks/:id'),
    blockLatest: buildRequestHandler<
      SiaCentralBlockLatestParams,
      SiaCentralBlockLatestPayload,
      SiaCentralBlockLatestResponse
    >(axios, 'get', '/explorer/blocks'),
    blocks: buildRequestHandler<
      SiaCentralBlocksParams,
      SiaCentralBlocksPayload,
      SiaCentralBlocksResponse
    >(axios, 'post', '/explorer/blocks'),
    contract: buildRequestHandler<
      SiaCentralContractParams,
      SiaCentralContractPayload,
      SiaCentralContractResponse
    >(axios, 'get', '/explorer/contracts/:id'),
    exchangeRates: buildRequestHandler<
      SiaCentralExchangeRatesParams,
      SiaCentralExchangeRatesPayload,
      SiaCentralExchangeRatesResponse
    >(axios, 'get', '/market/exchange-rate', {
      defaultParams: {
        currencies: 'sc',
      },
    }),
    host: buildRequestHandler<
      SiaCentralHostParams,
      SiaCentralHostPayload,
      SiaCentralHostResponse
    >(axios, 'get', '/hosts/:id'),
    hosts: buildRequestHandler<
      SiaCentralHostsParams,
      SiaCentralHostsPayload,
      SiaCentralHostsResponse
    >(axios, 'get', '/hosts/list', {
      defaultParams: {
        showinactive: false,
        sort: 'used_storage',
        dir: 'desc',
        protocol: 'rhp3',
        limit: 10,
        page: 1,
      },
    }),
    hostsNetworkAverages: buildRequestHandler<
      SiaCentralHostsNetworkAveragesParams,
      SiaCentralHostsNetworkAveragesPayload,
      SiaCentralHostsNetworkAveragesResponse
    >(axios, 'get', '/hosts/network/averages'),
    hostsNetworkMetrics: buildRequestHandler<
      SiaCentralHostsNetworkMetricsParams,
      SiaCentralHostsNetworkMetricsPayload,
      SiaCentralHostsNetworkMetricsResponse
    >(axios, 'get', '/hosts/network/metrics'),
    search: buildRequestHandler<
      SiaCentralSearchParams,
      SiaCentralSearchPayload,
      SiaCentralSearchResponse
    >(axios, 'post', '/explorer/search'),
    transaction: buildRequestHandler<
      SiaCentralTransactionParams,
      SiaCentralTransactionPayload,
      SiaCentralTransactionResponse
    >(axios, 'get', '/explorer/transactions/:id'),
  }
}
