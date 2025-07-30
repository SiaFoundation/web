import { useMemo } from 'react'
import { useHosts } from '../../../contexts/hosts'
import { BulkRemoveBlocklist } from '../../bulkActions/BulkRemoveBlocklist'

export function HostsRemoveBlocklist() {
  const { multiSelect } = useHosts()

  const hostAddresses = useMemo(
    () =>
      Object.entries(multiSelect.selection).map(([_, item]) => item.address),
    [multiSelect.selection],
  )

  return (
    <BulkRemoveBlocklist
      multiSelect={multiSelect}
      hostAddresses={hostAddresses}
    />
  )
}
