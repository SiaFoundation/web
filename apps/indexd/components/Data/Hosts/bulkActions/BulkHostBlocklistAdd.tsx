import { Button } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { HostData } from '../types'
import { Row } from '@tanstack/react-table'
import { CloseOutline16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../../contexts/dialog'

export function BulkHostBlocklistAdd({
  hosts,
}: {
  hosts: HostData[] | Row<HostData>[]
}) {
  const { openDialog } = useDialog()

  const normalizedHosts = useMemo(
    () =>
      hosts.map((host) =>
        'publicKey' in host ? host : (host.original as HostData),
      ),
    [hosts],
  )
  return (
    <Button
      onClick={() =>
        openDialog('hostBlocklistAdd', undefined, {
          hostBlocklistAdd: { hosts: normalizedHosts },
        })
      }
    >
      <CloseOutline16 />
      Block {hosts.length === 1 ? 'host' : 'hosts'}
    </Button>
  )
}
