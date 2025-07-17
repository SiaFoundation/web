import { countryCodeEmoji } from '@siafoundation/design-system'
import {
  monthsToBlocks,
  TBToBytes,
  humanBytes,
  humanSiacoin,
  sectorsToBytes,
} from '@siafoundation/units'
import { HostDataWithLocation } from '../../../contexts/hosts/types'
import BigNumber from 'bignumber.js'
import { CurrencyOption } from '@siafoundation/react-core'

export function getHostLabel({
  host,
  currency,
  rate,
}: {
  host: HostDataWithLocation
  currency?: CurrencyOption
  rate?: BigNumber
}) {
  const storagePrice = host.v2Settings.prices.storagePrice
  const storageCost = rate
    ? `${currency?.prefix}${new BigNumber(storagePrice || 0)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1))
        .div(1e24)
        .times(rate)
        .toFixed(2)}/TB`
    : `${humanSiacoin(
        new BigNumber(storagePrice || 0)
          .times(TBToBytes(1))
          .times(monthsToBlocks(1)),
        { fixed: 0 }
      )}/TB`

  const usedStorage = `${humanBytes(
    host.activeContracts
      .reduce((acc, c) => acc.plus(c.size), new BigNumber(0))
      .toNumber()
  )} utilized`

  const remainingStorage = sectorsToBytes(host.v2Settings.remainingStorage)
  const totalStorage = sectorsToBytes(host.v2Settings.totalStorage)
  const availableStorage = `${humanBytes(remainingStorage || 0)} / ${humanBytes(
    totalStorage || 0
  )} available`

  const cc = host.location.countryCode
    ? countryCodeEmoji(host.location.countryCode)
    : '🌍'

  return `${cc} · ${storageCost} · ${usedStorage} · ${availableStorage}`
}
