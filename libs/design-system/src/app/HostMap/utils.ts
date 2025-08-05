import { countryCodeEmoji } from '@siafoundation/units'
import {
  monthsToBlocks,
  TBToBytes,
  humanBytes,
  humanSiacoin,
  sectorsToBytes,
} from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { CurrencyOption } from '@siafoundation/react-core'
import { HostMapHost } from './types'
import { colors } from '../../lib/colors'

export function getHostColor(h: HostMapHost) {
  if (h.type === 'group') {
    return {
      colorHex: colors.blue[600],
    }
  }
  if (h.usable) {
    return {
      colorHex: colors.green[600],
    }
  }
  return {
    colorHex: colors.red[600],
  }
}

export function getHostLabel({
  host,
  currency,
  rate,
}: {
  host: HostMapHost
  currency?: CurrencyOption
  rate?: BigNumber
}) {
  if (!host.location) {
    return null
  }
  if (host.type === 'group') {
    return `${countryCodeEmoji(host.location.countryCode)} (${host.groupCount})`
  }
  if (!host.v2Settings) {
    return null
  }
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
        { fixed: 0 },
      )}/TB`

  const remainingStorage = sectorsToBytes(host.v2Settings.remainingStorage)
  const totalStorage = sectorsToBytes(host.v2Settings.totalStorage)
  const availableStorage = `${humanBytes(remainingStorage || 0)} / ${humanBytes(
    totalStorage || 0,
  )} available`

  const cc = host.location.countryCode
    ? countryCodeEmoji(host.location.countryCode)
    : '🌍'

  return `${cc} · ${storageCost} · ${availableStorage}`
}
