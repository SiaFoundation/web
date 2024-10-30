import { useMemo } from 'react'
import { useHosts } from '../../../contexts/hosts'
import { BulkAddAllowlist } from '../../bulkActions/BulkAddAllowlist'

export function HostsAddAllowlist() {
  const { multiSelect } = useHosts()

  const publicKeys = useMemo(
    () =>
      Object.entries(multiSelect.selection).map(([_, item]) => item.publicKey),
    [multiSelect.selection]
  )

  return <BulkAddAllowlist multiSelect={multiSelect} publicKeys={publicKeys} />
}
