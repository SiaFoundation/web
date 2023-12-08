import { Button, ChartXY, stripPrefix } from '@siafoundation/design-system'
import { useContracts } from '../../contexts/contracts'
import { StateNoData } from './StateNoData'

export function ContractMetrics() {
  const {
    selectedContract,
    allContractsSpendingMetrics,
    selectedContractSpendingMetrics,
    contractSetCountMetrics,
    graphMode,
    setGraphMode,
  } = useContracts()

  const tabsEl = (
    <div className="flex gap-2">
      {!selectedContract && (
        <Button
          variant={graphMode === 'spending' ? 'accent' : 'gray'}
          onClick={() => setGraphMode('spending')}
        >
          Funding & spending: All contracts
        </Button>
      )}
      {selectedContract && (
        <Button
          variant={graphMode === 'spending' ? 'accent' : 'gray'}
          onClick={() => setGraphMode('spending')}
        >
          Funding & spending: Contract{' '}
          {stripPrefix(selectedContract.id).slice(0, 6)}
        </Button>
      )}
      {!selectedContract && (
        <Button
          variant={graphMode === 'count' ? 'accent' : 'gray'}
          onClick={() => setGraphMode('count')}
        >
          Count
        </Button>
      )}
    </div>
  )

  return (
    <div className="w-full h-full">
      {graphMode === 'spending' && !selectedContract && (
        <ChartXY
          id="fundingAndSpending"
          height="100%"
          data={allContractsSpendingMetrics.data}
          config={allContractsSpendingMetrics.config}
          isLoading={allContractsSpendingMetrics.isLoading}
          actionsLeft={tabsEl}
          emptyState={<StateNoData />}
        />
      )}
      {graphMode === 'spending' && selectedContract && (
        <ChartXY
          id="fundingAndSpending"
          height="100%"
          data={selectedContractSpendingMetrics.data}
          config={selectedContractSpendingMetrics.config}
          isLoading={selectedContractSpendingMetrics.isLoading}
          actionsLeft={tabsEl}
          emptyState={<StateNoData />}
        />
      )}
      {graphMode === 'count' && !selectedContract && (
        <ChartXY
          id="count"
          height="100%"
          data={contractSetCountMetrics.data}
          config={contractSetCountMetrics.config}
          isLoading={contractSetCountMetrics.isLoading}
          actionsLeft={tabsEl}
          emptyState={<StateNoData />}
        />
      )}
    </div>
  )
}
