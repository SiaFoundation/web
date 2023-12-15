import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

export function useEstimates({
  isAutopilotEnabled,
  includeRedundancyMaxStoragePrice,
  includeRedundancyMaxUploadPrice,
  redundancyMultiplier,
  maxStoragePriceTBMonth,
  storageTB,
  maxDownloadPriceTB,
  downloadTBMonth,
  maxUploadPriceTB,
  uploadTBMonth,
}) {
  const canEstimate = useMemo(() => {
    if (!isAutopilotEnabled) {
      return false
    }
    return (
      maxStoragePriceTBMonth?.gt(0) &&
      storageTB?.gt(0) &&
      maxDownloadPriceTB?.gt(0) &&
      maxUploadPriceTB?.gt(0)
    )
  }, [
    isAutopilotEnabled,
    maxStoragePriceTBMonth,
    storageTB,
    maxDownloadPriceTB,
    maxUploadPriceTB,
  ])

  const estimatedSpendingPerMonth = useMemo(() => {
    if (!canEstimate) {
      return new BigNumber(0)
    }
    const _storageTB = storageTB?.gt(0) ? storageTB : new BigNumber(0)
    const _downloadTBMonth = downloadTBMonth?.gt(0)
      ? downloadTBMonth
      : new BigNumber(0)
    const _uploadTBMonth = uploadTBMonth?.gt(0)
      ? uploadTBMonth
      : new BigNumber(0)
    const _maxStoragePriceTBMonth = maxStoragePriceTBMonth?.gt(0)
      ? maxStoragePriceTBMonth
      : new BigNumber(0)
    const _maxUploadPriceTB = maxUploadPriceTB?.gt(0)
      ? maxUploadPriceTB
      : new BigNumber(0)
    const _maxDownloadPriceTB = maxDownloadPriceTB?.gt(0)
      ? maxDownloadPriceTB
      : new BigNumber(0)

    const storageCostPerMonth = includeRedundancyMaxStoragePrice
      ? _maxStoragePriceTBMonth.times(_storageTB)
      : _maxStoragePriceTBMonth.times(redundancyMultiplier).times(_storageTB)
    const downloadCostPerMonth = _maxDownloadPriceTB.times(_downloadTBMonth)
    const uploadCostPerMonth = includeRedundancyMaxUploadPrice
      ? _maxUploadPriceTB.times(_uploadTBMonth)
      : _maxUploadPriceTB.times(redundancyMultiplier).times(_uploadTBMonth)

    const totalCostPerMonth = storageCostPerMonth
      .plus(downloadCostPerMonth)
      .plus(uploadCostPerMonth)
    return totalCostPerMonth
  }, [
    canEstimate,
    includeRedundancyMaxStoragePrice,
    includeRedundancyMaxUploadPrice,
    redundancyMultiplier,
    maxStoragePriceTBMonth,
    storageTB,
    maxDownloadPriceTB,
    downloadTBMonth,
    maxUploadPriceTB,
    uploadTBMonth,
  ])

  const estimatedSpendingPerTB = useMemo(() => {
    if (!canEstimate) {
      return new BigNumber(0)
    }
    const totalCostPerMonthTB = estimatedSpendingPerMonth.div(storageTB)
    return totalCostPerMonthTB
  }, [canEstimate, estimatedSpendingPerMonth, storageTB])

  return {
    canEstimate,
    estimatedSpendingPerMonth,
    estimatedSpendingPerTB,
  }
}
