import { countryCodeEmoji } from '@siafoundation/design-system'
import {
  TBToBytes,
  humanBytes,
  humanSiacoin,
  monthsToBlocks,
} from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import type { SiaCentralPartialHost } from '../../content/geoHosts'

export function getHostLabel({
  host,
  rates,
}: {
  host: SiaCentralPartialHost
  rates?: {
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
        { fixed: 0 },
      )}/TB`

  const usedStorage = `${humanBytes(
    host.settings.total_storage - host.settings.remaining_storage,
  )} utilized`

  const availableStorage = `${humanBytes(
    host.settings.remaining_storage,
  )} / ${humanBytes(host.settings.total_storage)} available`

  return `${countryCodeEmoji(
    host.country_code,
  )} · ${storageCost} · ${usedStorage} · ${availableStorage}`
}
