import { useMemo } from 'react'
import { useHosts } from '../../../contexts/hosts'
import { BulkAddAllowlist } from '../../bulkActions/BulkAddAllowlist'

export function HostsAddAllowlist() {
  const { multiSelect } = useHosts()

  const publicKeys = useMemo(
    () =>
      Object.entries(multiSelect.selectionMap).map(
        ([_, item]) => item.publicKey
      ),
    [multiSelect.selectionMap]
  )

  return <BulkAddAllowlist multiSelect={multiSelect} publicKeys={publicKeys} />
}
