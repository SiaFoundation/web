import { buildRequestHandler, initAxios } from '@siafoundation/request'
import {
  type SiaCentralAddressParams,
  type SiaCentralAddressPayload,
  type SiaCentralAddressResponse,
  type SiaCentralBlockLatestParams,
  type SiaCentralBlockLatestPayload,
  type SiaCentralBlockLatestResponse,
  type SiaCentralBlockParams,
  type SiaCentralBlockPayload,
  type SiaCentralBlockResponse,
  type SiaCentralBlocksParams,
  type SiaCentralBlocksPayload,
  type SiaCentralBlocksResponse,
  type SiaCentralContractParams,
  type SiaCentralContractPayload,
  type SiaCentralContractResponse,
  type SiaCentralExchangeRatesParams,
  type SiaCentralExchangeRatesPayload,
  type SiaCentralExchangeRatesResponse,
  type SiaCentralHostParams,
  type SiaCentralHostPayload,
  type SiaCentralHostResponse,
  type SiaCentralHostsNetworkAveragesParams,
  type SiaCentralHostsNetworkAveragesPayload,
  type SiaCentralHostsNetworkAveragesResponse,
  type SiaCentralHostsNetworkMetricsParams,
  type SiaCentralHostsNetworkMetricsPayload,
  type SiaCentralHostsNetworkMetricsResponse,
  type SiaCentralHostsParams,
  type SiaCentralHostsPayload,
  type SiaCentralHostsResponse,
  type SiaCentralSearchParams,
  type SiaCentralSearchPayload,
  type SiaCentralSearchResponse,
  type SiaCentralTransactionParams,
  type SiaCentralTransactionPayload,
  type SiaCentralTransactionResponse,
  defaultApi,
} from '@siafoundation/sia-central-types'

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
