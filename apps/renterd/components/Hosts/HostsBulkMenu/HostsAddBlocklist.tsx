import { useMemo } from 'react'
import { useHosts } from '../../../contexts/hosts'
import { BulkAddBlocklist } from '../../bulkActions/BulkAddBlocklist'

export function HostsAddBlocklist() {
  const { multiSelect } = useHosts()

  const hostAddresses = useMemo(
    () =>
      Object.entries(multiSelect.selection).map(([_, item]) => item.address),
    [multiSelect.selection]
  )
  return (
    <BulkAddBlocklist multiSelect={multiSelect} hostAddresses={hostAddresses} />
  )
}
