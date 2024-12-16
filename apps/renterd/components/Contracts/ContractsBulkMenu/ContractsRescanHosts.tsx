import { useMemo } from 'react'
import { useContracts } from '../../../contexts/contracts'
import { BulkRescanHosts } from '../../bulkActions/BulkRescanHosts'

export function ContractsRescanHosts() {
  const { multiSelect } = useContracts()

  const publicKeys = useMemo(
    () =>
      Object.entries(multiSelect.selection).map(([_, item]) => item.hostKey),
    [multiSelect.selection]
  )

  return <BulkRescanHosts multiSelect={multiSelect} publicKeys={publicKeys} />
}
