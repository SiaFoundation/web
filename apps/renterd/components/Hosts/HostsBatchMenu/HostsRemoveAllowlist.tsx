import { useMemo } from 'react'
import { useHosts } from '../../../contexts/hosts'
import { BulkRemoveAllowlist } from '../../bulkActions/BulkRemoveAllowlist'

export function HostsRemoveAllowlist() {
  const { multiSelect } = useHosts()

  const publicKeys = useMemo(
    () =>
      Object.entries(multiSelect.selectionMap).map(
        ([_, item]) => item.publicKey
      ),
    [multiSelect.selectionMap]
  )

  return (
    <BulkRemoveAllowlist multiSelect={multiSelect} publicKeys={publicKeys} />
  )
}
