import { TBToBytes } from './bytes'
import BigNumber from 'bignumber.js'
import { humanSiacoin, toSiacoins } from './currency'
import { humanBytes } from './humanUnits'
import { valuePerBytePerBlockToPerTBPerMonth } from './valuePer'
import { ExplorerHost } from '@siafoundation/explored-types'
import { sectorsToBytes } from './sectors'

type Hastings = string

type Props = {
  price: Hastings
  exchange?: {
    currency: {
      prefix: string
    }
    rate: string
  }
}

export function getStorageCost({ price, exchange }: Props) {
  return exchange
    ? `${exchange.currency.prefix}${valuePerBytePerBlockToPerTBPerMonth(
        toSiacoins(price)
      )
        .times(exchange.rate || 1)
        .toFormat(2)}/TB`
    : `${humanSiacoin(
        valuePerBytePerBlockToPerTBPerMonth(new BigNumber(price)),
        {
          fixed: 3,
        }
      )}/TB`
}

function hastingsPerByteToCurrencyPerTBFormatted({ price, exchange }: Props) {
  return exchange
    ? `${exchange.currency.prefix}${toSiacoins(
        new BigNumber(price).times(TBToBytes(1))
      )
        .times(exchange.rate || 1)
        .toFormat(2)}/TB`
    : `${humanSiacoin(new BigNumber(price).times(TBToBytes(1)), {
        fixed: 3,
      })}/TB`
}

export function getDownloadCost({ price, exchange }: Props) {
  return hastingsPerByteToCurrencyPerTBFormatted({ price, exchange })
}

export function getUploadCost({ price, exchange }: Props) {
  return hastingsPerByteToCurrencyPerTBFormatted({ price, exchange })
}

export function getRemainingOverTotalStorage(host: ExplorerHost) {
  if (host.v2 === true) {
    return `${humanBytes(
      sectorsToBytes(host.v2Settings.remainingStorage)
    )}/${humanBytes(sectorsToBytes(host.v2Settings.totalStorage))} remaining`
  }
  return `${humanBytes(host.settings.remainingstorage)}/${humanBytes(
    host.settings.totalstorage
  )} remaining`
}

export function getRemainingStorage(host: ExplorerHost) {
  if (host.v2 === true) {
    return humanBytes(sectorsToBytes(host.v2Settings.remainingStorage))
  }
  return humanBytes(host.settings.remainingstorage)
}

export function getRedundancyMultiplier(
  minShards?: BigNumber,
  totalShards?: BigNumber
): BigNumber {
  let redundancyMult = new BigNumber(1)
  const canCalcRedundancy =
    minShards &&
    totalShards &&
    !minShards.isZero() &&
    !totalShards.isZero() &&
    totalShards.gte(minShards)
  if (canCalcRedundancy) {
    redundancyMult = totalShards.div(minShards)
  }
  return redundancyMult
}

export function calculateMaxSpending({
  maxStoragePriceTBMonth,
  maxDownloadPriceTB,
  maxUploadPriceTB,
  storageTB,
  downloadTBMonth,
  uploadTBMonth,
  redundancyMultiplier,
}: {
  maxStoragePriceTBMonth?: BigNumber
  maxDownloadPriceTB?: BigNumber
  maxUploadPriceTB?: BigNumber
  storageTB?: BigNumber
  downloadTBMonth?: BigNumber
  uploadTBMonth?: BigNumber
  redundancyMultiplier?: BigNumber
}) {
  // Return undefined if zero or negative values are provided.
  if (
    !maxStoragePriceTBMonth?.gt(0) ||
    !maxDownloadPriceTB?.gt(0) ||
    !maxUploadPriceTB?.gt(0) ||
    !redundancyMultiplier?.gt(0) ||
    !storageTB?.gt(0) ||
    !downloadTBMonth?.gt(0) ||
    !uploadTBMonth?.gt(0)
  ) {
    return undefined
  }

  const storageTBWithRedundancy = storageTB.times(redundancyMultiplier)
  const uploadTBMonthWithRedundancy = uploadTBMonth.times(redundancyMultiplier)

  return storageTBWithRedundancy
    .times(maxStoragePriceTBMonth)
    .plus(downloadTBMonth.times(maxDownloadPriceTB))
    .plus(uploadTBMonthWithRedundancy.times(maxUploadPriceTB))
}
