import { useMemo } from 'react'
import { useContracts } from '../../../contexts/contracts'
import { BulkAddBlocklist } from '../../bulkActions/BulkAddBlocklist'

export function ContractsAddBlocklist() {
  const { multiSelect } = useContracts()

  const hostAddresses = useMemo(
    () =>
      Object.entries(multiSelect.selectionMap).map(([_, item]) => item.hostIp),
    [multiSelect.selectionMap]
  )
  return (
    <BulkAddBlocklist multiSelect={multiSelect} hostAddresses={hostAddresses} />
  )
}
