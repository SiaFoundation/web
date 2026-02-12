import { Button } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { KeyData } from '../../../lib/connectKey'
import { Row } from '@tanstack/react-table'
import { GaugeIcon } from '@siafoundation/react-icons'
import { useDialog } from '../../../contexts/dialog'

export function BulkKeyQuotaReassign({
  keys,
}: {
  keys: KeyData[] | Row<KeyData>[]
}) {
  const { openDialog } = useDialog()

  const normalizedKeys = useMemo(
    () =>
      keys.map((key) => ('key' in key ? key : (key.original as KeyData))),
    [keys],
  )
  return (
    <Button
      onClick={() =>
        openDialog('keyQuotaReassign', undefined, {
          keyQuotaReassign: { keys: normalizedKeys },
        })
      }
    >
      <GaugeIcon size={16} />
      Reassign quota
    </Button>
  )
}
