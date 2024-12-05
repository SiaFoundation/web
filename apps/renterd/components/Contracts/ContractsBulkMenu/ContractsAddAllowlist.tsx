import { useMemo } from 'react'
import { useContracts } from '../../../contexts/contracts'
import { BulkAddAllowlist } from '../../bulkActions/BulkAddAllowlist'

export function ContractsAddAllowlist() {
  const { multiSelect } = useContracts()

  const publicKeys = useMemo(
    () =>
      Object.entries(multiSelect.selectionMap).map(([_, item]) => item.hostKey),
    [multiSelect.selectionMap]
  )

  return <BulkAddAllowlist multiSelect={multiSelect} publicKeys={publicKeys} />
}
