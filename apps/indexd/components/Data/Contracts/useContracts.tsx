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
import { BigNumber } from 'bignumber.js'
import { transformHost } from '../Hosts/transform'

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
  const rawContracts = useIndexContracts()
  const rawHosts = useIndexHosts()
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
  const contracts = useMemo(
    () =>
      rawContracts.data?.map((contract) => {
        const host = rawHosts.data?.find(
          (h) => h.publicKey === contract.hostKey,
        )
        const datum: ContractData = {
          ...contract,
          id: contract.id,
          host: host
            ? transformHost(host, { geo: geo.data, exchange })
            : undefined,
          exchange,
          sortingFields: {
            spending: {
              appendSector: new BigNumber(contract.spending.appendSector),
              freeSector: new BigNumber(contract.spending.freeSector),
              fundAccount: new BigNumber(contract.spending.fundAccount),
              sectorRoots: new BigNumber(contract.spending.sectorRoots),
            },
            remainingAllowance: new BigNumber(contract.remainingAllowance),
            totalCollateral: new BigNumber(contract.totalCollateral),
            contractPrice: new BigNumber(contract.contractPrice),
            minerFee: new BigNumber(contract.minerFee),
            usedCollateral: new BigNumber(contract.usedCollateral),
            initialAllowance: new BigNumber(contract.initialAllowance),
          },
        }
        return datum
      }) || [],
    [rawContracts.data, exchange, geo.data, rawHosts.data],
  )

  return contracts
}
