import {
  monthsToBlocks,
  TBToBytes,
  countryCodeEmoji,
} from '@siafoundation/design-system'
import { humanBytes, humanSiacoin, humanSpeed } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { Host } from '../../content/geoHosts'

export function getHostLabel({
  host,
  rates,
}: {
  host: Host
  rates: {
    usd: string
  }
}) {
  const storageCost = rates
    ? `$${new BigNumber(host.settings.storage_price)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1))
        .div(1e24)
        .times(rates?.usd || 1)
        .toFixed(2)}/TB`
    : `${humanSiacoin(
        new BigNumber(host.settings.storage_price)
          .times(TBToBytes(1))
          .times(monthsToBlocks(1)),
        { fixed: 0 }
      )}/TB`

  return `${countryCodeEmoji(host.country_code)} · ${humanBytes(
    host.settings.total_storage
  )} · ${humanSpeed(
    (host.benchmark.data_size * 8) / (host.benchmark.download_time / 1000)
  )} · ${storageCost}`
}
