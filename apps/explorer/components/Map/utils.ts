import {
  countryCodeEmoji,
  monthsToBlocks,
  TBToBytes,
  humanBytes,
  humanSiacoin,
} from '@siafoundation/units'
import { ExplorerPartialHost } from './types'
import BigNumber from 'bignumber.js'

export function getHostLabel({
  host,
  exchangeRateUSD,
}: {
  host: ExplorerPartialHost
  exchangeRateUSD?: BigNumber
}) {
  const storageCost = exchangeRateUSD
    ? `$${new BigNumber(host.storagePrice)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1))
        .div(1e24)
        .times(exchangeRateUSD)
        .toFixed(2)}/TB`
    : `${humanSiacoin(
        new BigNumber(host.storagePrice)
          .times(TBToBytes(1))
          .times(monthsToBlocks(1)),
        { fixed: 0 },
      )}/TB`

  const usedStorage = `${humanBytes(
    host.totalStorage - host.remainingStorage,
  )} utilized`

  const availableStorage = `${humanBytes(host.remainingStorage)} / ${humanBytes(
    host.totalStorage,
  )} available`

  return `${countryCodeEmoji(
    host.location.countryCode,
  )} · ${storageCost} · ${usedStorage} · ${availableStorage}`
}
