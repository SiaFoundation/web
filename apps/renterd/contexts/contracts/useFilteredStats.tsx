import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { ContractData } from './types'

export function useFilteredStats({
  datasetFiltered,
}: {
  datasetFiltered: ContractData[] | undefined
}) {
  const sizeTotal = useMemo(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.reduce((acc, datum) => {
      return acc.plus(datum.size)
    }, new BigNumber(0))
  }, [datasetFiltered])

  const prunableSizeTotal = useMemo(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.reduce((acc, datum) => {
      if (!datum.inAutopilotSet || !datum.prunableSize) {
        return acc
      }
      return acc.plus(datum.prunableSize)
    }, new BigNumber(0))
  }, [datasetFiltered])

  const expiringSizeTotal = useMemo(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.reduce((acc, datum) => {
      if (datum.inAutopilotSet || !datum.prunableSize) {
        return acc
      }
      return acc.plus(datum.size).minus(datum.prunableSize)
    }, new BigNumber(0))
  }, [datasetFiltered])

  const totalCostTotal = useMemo(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.reduce((acc, datum) => {
      return acc.plus(datum.totalCost)
    }, new BigNumber(0))
  }, [datasetFiltered])

  const spendingUploadsTotal = useMemo(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.reduce((acc, datum) => {
      return acc.plus(datum.spendingUploads)
    }, new BigNumber(0))
  }, [datasetFiltered])

  const spendingDeletionsTotal = useMemo(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.reduce((acc, datum) => {
      return acc.plus(datum.spendingDeletions)
    }, new BigNumber(0))
  }, [datasetFiltered])

  const spendingFundAccountTotal = useMemo(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.reduce((acc, datum) => {
      return acc.plus(datum.spendingFundAccount)
    }, new BigNumber(0))
  }, [datasetFiltered])

  const spendingSectorRootsTotal = useMemo(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.reduce((acc, datum) => {
      return acc.plus(datum.spendingSectorRoots)
    }, new BigNumber(0))
  }, [datasetFiltered])

  return useMemo(() => {
    return {
      sizeTotal,
      prunableSizeTotal,
      expiringSizeTotal,
      totalCostTotal,
      spendingUploadsTotal,
      spendingDeletionsTotal,
      spendingFundAccountTotal,
      spendingSectorRootsTotal,
    }
  }, [
    sizeTotal,
    prunableSizeTotal,
    expiringSizeTotal,
    totalCostTotal,
    spendingUploadsTotal,
    spendingDeletionsTotal,
    spendingFundAccountTotal,
    spendingSectorRootsTotal,
  ])
}
