import { countryCodeEmoji } from '@siafoundation/design-system'
import {
  monthsToBlocks,
  TBToBytes,
  humanBytes,
  humanSiacoin,
} from '@siafoundation/units'
import { ExplorerPartialHost } from '../../content/geoHosts'
import BigNumber from 'bignumber.js'

export function getHostLabel({
  host,
  exchangeRateUSD,
}: {
  host: ExplorerPartialHost
  exchangeRateUSD?: BigNumber
}) {
  const storageCost = exchangeRateUSD
    ? `$${new BigNumber(host.settings.storageprice)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1))
        .div(1e24)
        .times(exchangeRateUSD)
        .toFixed(2)}/TB`
    : `${humanSiacoin(
        new BigNumber(host.settings.storageprice)
          .times(TBToBytes(1))
          .times(monthsToBlocks(1)),
        { fixed: 0 }
      )}/TB`

  const usedStorage = `${humanBytes(
    host.settings.totalstorage - host.settings.remainingstorage
  )} utilized`

  const availableStorage = `${humanBytes(
    host.settings.remainingstorage
  )} / ${humanBytes(host.settings.totalstorage)} available`

  return `${countryCodeEmoji(
    host.location.countryCode
  )} · ${storageCost} · ${usedStorage} · ${availableStorage}`
}
