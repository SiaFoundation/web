import { countryCodeEmoji } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { ExplorerPartialHost } from '../../content/geoHosts'
import {
  monthsToBlocks,
  TBToBytes,
  humanBytes,
  humanSiacoin,
} from '@siafoundation/units'

export function getHostLabel({
  host,
  rateUsd,
}: {
  host: ExplorerPartialHost
  rateUsd: BigNumber
}) {
  const storageCost = rateUsd
    ? `$${new BigNumber(host.settings.storageprice)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1))
        .div(1e24)
        .times(rateUsd)
        .toFixed(2)}/TB`
    : `${humanSiacoin(
        new BigNumber(host.settings.storageprice)
          .times(TBToBytes(1))
          .times(monthsToBlocks(1)),
        { fixed: 0 }
      )}/TB`

  return `${countryCodeEmoji(host.location.countryCode)} · ${humanBytes(
    host.settings.totalstorage
  )} · ${storageCost}`
}
