import { useApp } from '../../contexts/app'
import { useConfig } from '../../contexts/config'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

export function useEstimatedSpending() {
  const { isAutopilotEnabled } = useApp()
  const { form } = useConfig()
  const allowanceMonth = form.watch('allowanceMonth')
  const storageTB = form.watch('storageTB')
  const canEstimate = useMemo(() => {
    if (!isAutopilotEnabled) {
      return false
    }
    return !!allowanceMonth?.gt(0) && !!storageTB?.gt(0)
  }, [isAutopilotEnabled, allowanceMonth, storageTB])

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
