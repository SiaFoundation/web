import { useMemo } from 'react'
import { useContracts } from '../../../contexts/contracts'
import { BulkAddAllowlist } from '../../bulkActions/BulkAddAllowlist'

export function ContractsAddAllowlist() {
  const { multiSelect } = useContracts()

  const publicKeys = useMemo(
    () =>
      Object.entries(multiSelect.selection).map(([_, item]) => item.hostKey),
    [multiSelect.selection]
  )

  return <BulkAddAllowlist multiSelect={multiSelect} publicKeys={publicKeys} />
}
