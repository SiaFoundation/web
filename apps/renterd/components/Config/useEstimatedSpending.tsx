import { useConfig } from '../../contexts/config'
import { useMemo } from 'react'

export function useEstimatedSpending() {
  const { form } = useConfig()
  const allowanceMonth = form.watch('allowanceMonth')
  const storageTB = form.watch('storageTB')

  const estimatedSpendingPerMonth = useMemo(() => {
    if (!allowanceMonth?.gt(0)) {
      return undefined
    }
    return allowanceMonth
  }, [allowanceMonth])

  const estimatedSpendingPerTB = useMemo(() => {
    if (!estimatedSpendingPerMonth?.gt(0) || !storageTB?.gt(0)) {
      return undefined
    }
    const totalCostPerMonthTB = estimatedSpendingPerMonth.div(storageTB)
    return totalCostPerMonthTB
  }, [estimatedSpendingPerMonth, storageTB])

  return {
    estimatedSpendingPerMonth,
    estimatedSpendingPerTB,
  }
}
