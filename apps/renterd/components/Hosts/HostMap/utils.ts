import { countryCodeEmoji } from '@siafoundation/design-system'
import {
  monthsToBlocks,
  TBToBytes,
  humanBytes,
  humanSiacoin,
} from '@siafoundation/units'
import { HostDataWithLocation } from '../../../contexts/hosts/types'
import BigNumber from 'bignumber.js'

export function getHostLabel({
  host,
  exchangeRateUSD,
}: {
  host: HostDataWithLocation
  exchangeRateUSD?: BigNumber
}) {
  const storageCost = exchangeRateUSD
    ? `$${new BigNumber(host.settings?.storageprice || 0)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1))
        .div(1e24)
        .times(exchangeRateUSD)
        .toFixed(2)}/TB`
    : `${humanSiacoin(
        new BigNumber(host.settings?.storageprice || 0)
          .times(TBToBytes(1))
          .times(monthsToBlocks(1)),
        { fixed: 0 }
      )}/TB`

  const usedStorage = `${humanBytes(
    host.activeContracts
      .reduce((acc, c) => acc.plus(c.size), new BigNumber(0))
      .toNumber()
  )} utilized`

  const availableStorage = `${humanBytes(
    host.settings?.remainingstorage || 0
  )} / ${humanBytes(host.settings?.totalstorage || 0)} available`

  const cc = host.countryCode ? countryCodeEmoji(host.countryCode) : '🌍'

  return `${cc} · ${storageCost} · ${usedStorage} · ${availableStorage}`
}
