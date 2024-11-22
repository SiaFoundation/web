import { useMemo } from 'react'
import { useHosts } from '../../../contexts/hosts'
import { BulkRemoveBlocklist } from '../../bulkActions/BulkRemoveBlocklist'

export function HostsRemoveBlocklist() {
  const { multiSelect } = useHosts()

  const hostAddresses = useMemo(
    () =>
      Object.entries(multiSelect.selectionMap).map(
        ([_, item]) => item.netAddress
      ),
    [multiSelect.selectionMap]
  )

  return (
    <BulkRemoveBlocklist
      multiSelect={multiSelect}
      hostAddresses={hostAddresses}
    />
  )
}
