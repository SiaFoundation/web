import { useMemo } from 'react'
import { useContracts } from '../../../contexts/contracts'
import { BulkRemoveAllowlist } from '../../bulkActions/BulkRemoveAllowlist'

export function ContractsRemoveAllowlist() {
  const { multiSelect } = useContracts()

  const publicKeys = useMemo(
    () =>
      Object.entries(multiSelect.selectionMap).map(([_, item]) => item.hostKey),
    [multiSelect.selectionMap]
  )

  return (
    <BulkRemoveAllowlist multiSelect={multiSelect} publicKeys={publicKeys} />
  )
}
