import { TBToBytes } from './bytes'
import BigNumber from 'bignumber.js'
import { humanSiacoin, toSiacoins } from './currency'
import { valuePerBytePerBlockToPerTBPerMonth } from './valuePer'
import { sectorsToBytes } from './sectors'
import { V2HostSettings } from '@siafoundation/types'

export function storagePriceInHastingsPerTBPerMonth({
  price,
}: {
  price: string
}): BigNumber {
  return valuePerBytePerBlockToPerTBPerMonth(new BigNumber(price))
}

export function ingressPriceInHastingsPerTBPerMonth({
  price,
}: {
  price: string
}): BigNumber {
  return new BigNumber(price).times(TBToBytes(1))
}

export function egressPriceInHastingsPerTBPerMonth({
  price,
}: {
  price: string
}): BigNumber {
  return new BigNumber(price).times(TBToBytes(1))
}

export function displayAsCurrencyPerTB({
  hastings,
  exchange,
  perMonth = false,
}: {
  hastings: BigNumber
  exchange?: { currency: { prefix: string }; rate: BigNumber | string | number }
  perMonth?: boolean
}) {
  return exchange
    ? `${exchange.currency.prefix}${toSiacoins(hastings)
        .times(exchange.rate || 1)
        .toFormat(2)}/TB${perMonth ? '/month' : ''}`
    : `${humanSiacoin(hastings, {
        fixed: 3,
      })}/TB${perMonth ? '/month' : ''}`
}

export function displayStoragePricePerTBPerMonth({
  price,
  exchange,
}: {
  price: string
  exchange?: { currency: { prefix: string }; rate: BigNumber | string | number }
}): string {
  const hastings = storagePriceInHastingsPerTBPerMonth({ price })
  return displayAsCurrencyPerTB({
    hastings,
    exchange,
    perMonth: true,
  })
}

export function displayEgressPricePerTBPerMonth({
  price,
  exchange,
}: {
  price: string
  exchange?: { currency: { prefix: string }; rate: BigNumber | string | number }
}) {
  const hastings = egressPriceInHastingsPerTBPerMonth({ price })
  return displayAsCurrencyPerTB({
    hastings,
    exchange,
  })
}

export function displayIngressPricePerTBPerMonth({
  price,
  exchange,
}: {
  price: string
  exchange?: { currency: { prefix: string }; rate: BigNumber | string | number }
}) {
  const hastings = ingressPriceInHastingsPerTBPerMonth({ price })
  return displayAsCurrencyPerTB({
    hastings,
    exchange,
  })
}

export function remainingStorageInBytes({
  v2Settings,
}: {
  v2Settings: V2HostSettings
}) {
  return sectorsToBytes(v2Settings.remainingStorage)
}

export function getRedundancyMultiplier(
  minShards?: BigNumber,
  totalShards?: BigNumber,
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
