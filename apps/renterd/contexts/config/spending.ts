import { calculateMaxSpending } from '@siafoundation/units'
import BigNumber from 'bignumber.js'

export const defaultMaxPricingFactor = 1.5
export const defaultStorageWeight = 4
export const defaultDownloadWeight = 5
export const defaultUploadWeight = 1

/**
 * This function calculates the max price per TB for storage, download, and
 * upload given a monthly spending estimate and usage estimates in TB for each
 * type. The prices are kept proportional to each other using the weight factors
 * provided as parameters. Storage and upload are also scaled by the redundancy
 * multiplier.
 *
 * The total cost equation is:
 * spendingMonth * maxPricingFactor = scaledSpending =
 *   storageTBWithRedundancy * storageWeight * unitCost +
 *   downloadTBMonth * downloadWeight * unitCost +
 *   uploadTBMonthWithRedundancy * uploadWeight * unitCost
 *
 * Once the unit cost is determined, the individual prices can be calculated:
 * maxUploadPriceTB = unitCost * uploadWeight
 * maxDownloadPriceTB = unitCost * downloadWeight
 * maxStoragePriceTBMonth = unitCost * storageWeight
 *
 * The function also includes an spending scaling factor to account for
 * contract price variation. For example, if a user expects to pay $2 per TB,
 * they should set the max value to $4 per TB because the optimal contracts may
 * vary, eg: one contract at $1 and another at $3 which average to $2. The
 * scaling factor helps avoid unnecessary churn.
 *
 * @param params - The parameters for the function.
 * @param params.spendingMonth - The total spending per month.
 * @param params.maxPricingFactor - The scaling factor to apply to the max prices.
 * @param params.storageTB - The estimated amount of storage in TB.
 * @param params.downloadTBMonth - The estimated amount of download in TB per
 * month.
 * @param params.uploadTBMonth - The estimated amount of upload in TB per month.
 * @param params.redundancyMultiplier - The redundancy multiplier.
 * @param params.storageWeight - The weight factor for storage.
 * @param params.downloadWeight - The weight factor for download.
 * @param params.uploadWeight - The weight factor for upload.
 * @returns An object containing the price per TB for storage, download, and
 * upload.
 */
export function derivePricingFromSpendingEstimate({
  estimatedSpendingPerMonth,
  maxPricingFactor = defaultMaxPricingFactor,
  storageTB,
  downloadTBMonth,
  uploadTBMonth,
  redundancyMultiplier,
  storageWeight = defaultStorageWeight,
  downloadWeight = defaultDownloadWeight,
  uploadWeight = defaultUploadWeight,
}: {
  estimatedSpendingPerMonth?: BigNumber
  maxPricingFactor?: number
  storageTB?: BigNumber
  downloadTBMonth?: BigNumber
  uploadTBMonth?: BigNumber
  redundancyMultiplier?: BigNumber
  storageWeight?: number
  downloadWeight?: number
  uploadWeight?: number
}) {
  // Return undefined if zero values are provided.
  if (
    !estimatedSpendingPerMonth?.gt(0) ||
    maxPricingFactor <= 0 ||
    !redundancyMultiplier?.gt(0) ||
    !storageTB?.gt(0) ||
    !downloadTBMonth?.gt(0) ||
    !uploadTBMonth?.gt(0)
  ) {
    return undefined
  }
  // Apply scaling factor to spending.
  const scaledSpending = estimatedSpendingPerMonth.times(maxPricingFactor)

  const storageTBWithRedundancy = storageTB.times(redundancyMultiplier)
  const uploadTBMonthWithRedundancy = uploadTBMonth.times(redundancyMultiplier)

  // Calculate the unit cost based on the provided spending and usage estimates.
  const unitCost = scaledSpending.div(
    storageTBWithRedundancy
      .times(storageWeight)
      .plus(downloadTBMonth.times(downloadWeight))
      .plus(uploadTBMonthWithRedundancy.times(uploadWeight))
  )

  // Calculate the price per TB for each type of usage.
  const maxUploadPriceTB = unitCost.times(uploadWeight)
  const maxDownloadPriceTB = unitCost.times(downloadWeight)
  const maxStoragePriceTBMonth = unitCost.times(storageWeight)

  return {
    maxUploadPriceTB,
    maxDownloadPriceTB,
    maxStoragePriceTBMonth,
  }
}

/**
 * This function calculates the estimated spending per month given the
 * max price per TB for storage, download, and upload, along with estimated
 * usage in TB for each type.
 *
 * @param params - The parameters for the function.
 * @param params.maxStoragePriceTBMonth - The max price per TB per month for storage.
 * @param params.maxDownloadPriceTB - The max price per TB for download.
 * @param params.maxUploadPriceTB - The max price per TB for upload.
 * @param params.maxPricingFactor - The scaling factor applied to the spending.
 * @param params.storageTB - The estimated amount of storage in TB.
 * @param params.downloadTBMonth - The estimated amount of download in TB per month.
 * @param params.uploadTBMonth - The estimated amount of upload in TB per month.
 * @param params.redundancyMultiplier - The redundancy multiplier.
 * @returns The calculated spending per month.
 */
export function calculateSpendingEstimate({
  maxStoragePriceTBMonth,
  maxDownloadPriceTB,
  maxUploadPriceTB,
  maxPricingFactor = defaultMaxPricingFactor,
  storageTB,
  downloadTBMonth,
  uploadTBMonth,
  redundancyMultiplier,
}: {
  maxStoragePriceTBMonth?: BigNumber
  maxDownloadPriceTB?: BigNumber
  maxUploadPriceTB?: BigNumber
  maxPricingFactor?: number
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
    maxPricingFactor <= 0 ||
    !redundancyMultiplier?.gt(0) ||
    !storageTB?.gt(0) ||
    !downloadTBMonth?.gt(0) ||
    !uploadTBMonth?.gt(0)
  ) {
    return undefined
  }

  // Calculate the max spending.
  const maxSpending = calculateMaxSpending({
    maxStoragePriceTBMonth,
    maxDownloadPriceTB,
    maxUploadPriceTB,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
  })

  // Calculate the spending estimate by dividing the max spending by the
  // max pricing factor.
  const spendingMonth = maxSpending?.div(maxPricingFactor)

  return spendingMonth?.integerValue()
}
