import { useMemo } from 'react'
import { useContracts } from '../../../contexts/contracts'
import { BulkRemoveBlocklist } from '../../bulkActions/BulkRemoveBlocklist'

export function ContractsRemoveBlocklist() {
  const { multiSelect } = useContracts()

  const hostAddresses = useMemo(
    () => Object.entries(multiSelect.selection).map(([_, item]) => item.hostIp),
    [multiSelect.selection]
  )

  return (
    <BulkRemoveBlocklist
      multiSelect={multiSelect}
      hostAddresses={hostAddresses}
    />
  )
}
