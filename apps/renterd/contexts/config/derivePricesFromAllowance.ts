import BigNumber from 'bignumber.js'

/**
 * This function calculates the max price per TB for storage, download, and
 * upload given a total spending allowance and estimated usage in TB for each
 * type. The prices are kept proportional to each other using the weight factors
 * provided as parameters. Storage and upload are also scaled by the redundancy
 * multiplier.
 *
 * The total cost equation is:
 * allowance * allowanceFactor = scaledAllowance =
 *   storageTBWithRedundancy * storageWeight * unitCost +
 *   downloadTBMonth * downloadWeight * unitCost +
 *   uploadTBMonthWithRedundancy * uploadWeight * unitCost
 *
 * Once the unit cost is determined, the individual prices can be calculated:
 * maxUploadPriceTB = unitCost * uploadWeight
 * maxDownloadPriceTB = unitCost * downloadWeight
 * maxStoragePriceTBMonth = unitCost * storageWeight
 *
 * The function also includes an allowance scaling factor to account for
 * contract price variation. For example, if a user expects to pay $2 per TB,
 * they should set the max value to $4 per TB because the optimal contracts may
 * vary, eg: one contract at $1 and another at $3 which average to $2. The
 * scaling factor helps avoid unnecessary churn.
 *
 * @param params - The parameters for the function.
 * @param params.allowanceMonth - The total spending allowance per month.
 * @param params.allowanceFactor - The scaling factor to apply to the allowance.
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
export function derivePricingFromAllowance({
  allowanceMonth,
  allowanceFactor = 1.5,
  storageTB,
  downloadTBMonth,
  uploadTBMonth,
  redundancyMultiplier,
  storageWeight = 4,
  downloadWeight = 5,
  uploadWeight = 1,
}: {
  allowanceMonth: BigNumber
  allowanceFactor?: number
  storageTB: BigNumber
  downloadTBMonth: BigNumber
  uploadTBMonth: BigNumber
  redundancyMultiplier: BigNumber
  storageWeight?: number
  downloadWeight?: number
  uploadWeight?: number
}) {
  // Return null if zero values are provided.
  if (
    !allowanceMonth?.gt(0) ||
    allowanceFactor <= 0 ||
    !redundancyMultiplier?.gt(0) ||
    !storageTB?.gt(0) ||
    !downloadTBMonth?.gt(0) ||
    !uploadTBMonth?.gt(0)
  ) {
    return null
  }
  // Apply scaling factor to allowance.
  const scaledAllowance = allowanceMonth.times(allowanceFactor)

  const storageTBWithRedundancy = storageTB.times(redundancyMultiplier)
  const uploadTBMonthWithRedundancy = uploadTBMonth.times(redundancyMultiplier)

  // Calculate the unit cost based on the provided allowance and usage estimates.
  const unitCost = scaledAllowance.div(
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
