import { mock } from '../mockData'
import { Heading, HostMap, Text } from '@siafoundation/design-system'
import { DrawerAccountsTable } from '../DrawerAccountsTable'
import { useTableParams } from '../useTableParams'
import { useMemo } from 'react'

export function ContractDetailsDrawer() {
  const { selectedId } = useTableParams('contractList')
  const contract = useMemo(
    () => mock.contracts.find((c) => c.id === selectedId),
    [selectedId]
  )
  const mapContract = useMemo(() => {
    if (!contract) return null
    return {
      id: contract.host.id,
      publicKey: contract.host.id,
      activeContractsCount: contract.host.contracts.length,
      isUsable: contract.state === 'active',
      activeContracts: [contract],
      location: contract.host.location,
      v2Settings: contract.host.v2Settings,
    }
  }, [contract])
  if (!contract) {
    return (
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <Text>Contract not found</Text>
      </div>
    )
  }
  return (
    <div className="flex flex-col overflow-hidden">
      <Heading size="24" className="mb-2">
        Contract: {contract?.id}
      </Heading>
      <HostMap
        hosts={mapContract ? [mapContract] : []}
        activeHost={null}
        onHostMapClick={() => null}
        showLegend={false}
        scale={180}
      />
      <Text size="16" weight="medium" className="mb-1">
        Accounts
      </Text>
      <DrawerAccountsTable scope="contractAccounts" />
    </div>
  )
}
