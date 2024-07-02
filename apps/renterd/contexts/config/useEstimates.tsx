import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

export function useEstimates({
  isAutopilotEnabled,
  allowanceMonth,
  storageTB,
}: {
  isAutopilotEnabled: boolean
  allowanceMonth: BigNumber
  storageTB: BigNumber
}) {
  const canEstimate = useMemo(() => {
    if (!isAutopilotEnabled) {
      return false
    }
    return !!allowanceMonth?.gt(0)
  }, [isAutopilotEnabled, allowanceMonth])

  const estimatedSpendingPerMonth = useMemo(() => {
    if (!canEstimate) {
      return new BigNumber(0)
    }
    return allowanceMonth
  }, [canEstimate, allowanceMonth])

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
