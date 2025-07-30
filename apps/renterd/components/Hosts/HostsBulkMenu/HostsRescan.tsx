import { useMemo } from 'react'
import { BulkRescanHosts } from '../../bulkActions/BulkRescanHosts'
import { useHosts } from '../../../contexts/hosts'

export function HostsRescan() {
  const { multiSelect } = useHosts()

  const publicKeys = useMemo(
    () =>
      Object.entries(multiSelect.selection).map(([_, item]) => item.publicKey),
    [multiSelect.selection],
  )

  return <BulkRescanHosts multiSelect={multiSelect} publicKeys={publicKeys} />
}
