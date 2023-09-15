import { TBToBytes, monthsToBlocks } from '@siafoundation/design-system'
import {
  SiaCentralExchangeRates,
  SiaCentralHost,
} from '@siafoundation/sia-central'
import BigNumber from 'bignumber.js'
import { humanBytes, humanSiacoin, humanSpeed } from '@siafoundation/sia-js'

type Props = {
  price: string
  rates: SiaCentralExchangeRates
}

export function getStorageCost({ price, rates }: Props) {
  return rates
    ? `$${new BigNumber(price)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1))
        .div(1e24)
        .times(rates.sc.usd || 1)
        .toFixed(2)}/TB`
    : `${humanSiacoin(
        new BigNumber(price).times(TBToBytes(1)).times(monthsToBlocks(1)),
        { fixed: 0 }
      )}/TB`
}

export function getDownloadCost({ price, rates }: Props) {
  return rates
    ? `$${new BigNumber(price)
        .times(TBToBytes(1))
        .div(1e24)
        .times(rates.sc.usd || 1)
        .toFixed(2)}/TB`
    : `${humanSiacoin(new BigNumber(price).times(TBToBytes(1)), {
        fixed: 0,
      })}/TB`
}

export function getUploadCost({ price, rates }: Props) {
  return rates
    ? `$${new BigNumber(price)
        .times(TBToBytes(1))
        .div(1e24)
        .times(rates.sc.usd || 1)
        .toFixed(2)}/TB`
    : `${humanSiacoin(new BigNumber(price).times(TBToBytes(1)), {
        fixed: 0,
      })}/TB`
}

export function getDownloadSpeed(host: SiaCentralHost) {
  return humanSpeed(
    (host.benchmark.data_size * 8) / (host.benchmark.download_time / 1000)
  )
}

export function getUploadSpeed(host: SiaCentralHost) {
  return humanSpeed(
    (host.benchmark.data_size * 8) / (host.benchmark.upload_time / 1000)
  )
}

export function getRemainingOverTotalStorage(host: SiaCentralHost) {
  return `${humanBytes(host.settings.remaining_storage)}/${humanBytes(
    host.settings.total_storage
  )} remaining`
}

export function getRemainingStorage(host: SiaCentralHost) {
  return humanBytes(host.settings.remaining_storage)
}
