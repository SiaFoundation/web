import { useMemo } from 'react'
import { useHosts } from '../../../contexts/hosts'
import { BulkAddBlocklist } from '../../bulkActions/BulkAddBlocklist'

export function HostsAddBlocklist() {
  const { multiSelect } = useHosts()

  const hostAddresses = useMemo(
    () =>
      Object.entries(multiSelect.selectionMap).map(
        ([_, item]) => item.netAddress
      ),
    [multiSelect.selectionMap]
  )
  return (
    <BulkAddBlocklist multiSelect={multiSelect} hostAddresses={hostAddresses} />
  )
}
