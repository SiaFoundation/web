import { useMemo } from 'react'
import { useHosts } from '../../../contexts/hosts'
import { BulkRemoveAllowlist } from '../../bulkActions/BulkRemoveAllowlist'

export function HostsRemoveAllowlist() {
  const { multiSelect } = useHosts()

  const publicKeys = useMemo(
    () =>
      Object.entries(multiSelect.selection).map(([_, item]) => item.publicKey),
    [multiSelect.selection]
  )

  return (
    <BulkRemoveAllowlist multiSelect={multiSelect} publicKeys={publicKeys} />
  )
}
