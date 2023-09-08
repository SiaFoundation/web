import { TBToBytes, monthsToBlocks } from '@siafoundation/design-system'
import {
  SiaCentralExchangeRates,
  SiaCentralHost,
} from '@siafoundation/sia-central'
import BigNumber from 'bignumber.js'
import { humanSiacoin } from '@siafoundation/sia-js'

type Props = {
  host: SiaCentralHost
  rates: SiaCentralExchangeRates
}

export function getStorageCost({ host, rates }: Props) {
  return rates
    ? `$${new BigNumber(host.settings.storage_price)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1))
        .div(1e24)
        .times(rates.sc.usd || 1)
        .toFixed(2)}/TB`
    : `${humanSiacoin(
        new BigNumber(host.settings.storage_price)
          .times(TBToBytes(1))
          .times(monthsToBlocks(1)),
        { fixed: 0 }
      )}/TB`
}

export function getDownloadCost({ host, rates }: Props) {
  return rates
    ? `$${new BigNumber(host.settings.download_price)
        .times(TBToBytes(1))
        .div(1e24)
        .times(rates.sc.usd || 1)
        .toFixed(2)}/TB`
    : `${humanSiacoin(
        new BigNumber(host.settings.download_price).times(TBToBytes(1)),
        { fixed: 0 }
      )}/TB`
}

export function getUploadCost({ host, rates }: Props) {
  return rates
    ? `$${new BigNumber(host.settings.upload_price)
        .times(TBToBytes(1))
        .div(1e24)
        .times(rates.sc.usd || 1)
        .toFixed(2)}/TB`
    : `${humanSiacoin(
        new BigNumber(host.settings.upload_price).times(TBToBytes(1)),
        { fixed: 0 }
      )}/TB`
}
