import {
  monthsToBlocks,
  TBToBytes,
  countryCodeEmoji,
} from '@siafoundation/design-system'
import { humanBytes, humanSiacoin } from '@siafoundation/sia-js'
import { HostDataWithLocation } from '../../../contexts/hosts/types'
import BigNumber from 'bignumber.js'

export function getHostLabel({
  host,
  rates,
}: {
  host: HostDataWithLocation
  rates?: {
    usd: string
  }
}) {
  const storageCost = rates
    ? `$${new BigNumber(host.settings.storageprice)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1))
        .div(1e24)
        .times(rates?.usd || 1)
        .toFixed(2)}/TB`
    : `${humanSiacoin(
        new BigNumber(host.settings.storageprice)
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
    host.settings.remainingstorage
  )} / ${humanBytes(host.settings.totalstorage)} available`

  return `${countryCodeEmoji(
    host.countryCode
  )} · ${storageCost} · ${usedStorage} · ${availableStorage}`
}
