import { ChartXY, Text, stripPrefix } from '@siafoundation/design-system'
import { useContracts } from '../../contexts/contracts'

export function ContractMetrics() {
  const { selectedContract, contractMetrics } = useContracts()

  if (!selectedContract) {
    return null
  }

  return (
    <ChartXY
      id="fundingAndSpending"
      height="100%"
      data={contractMetrics.data}
      config={contractMetrics.config}
      isLoading={contractMetrics.isLoading}
      actionsLeft={
        <>
          <Text font="mono" weight="semibold">
            Contract {stripPrefix(selectedContract.id).slice(0, 6)}: funding &
            spending
          </Text>
        </>
      }
    />
  )
}
