import { Button, handleBatchOperation } from '@siafoundation/design-system'
import { useAdminHostsBlocklistDelete } from '@siafoundation/indexd-react'
import { useCallback } from 'react'
import { pluralize } from '@siafoundation/units'
import { HostData } from '../types'
import { useMutate } from '@siafoundation/react-core'
import { adminHostsRoute } from '@siafoundation/indexd-types'
import { Row } from '@tanstack/react-table'
import { CheckmarkOutline16 } from '@siafoundation/react-icons'

export function BulkHostBlocklistRemove({
  hosts,
}: {
  hosts: HostData[] | Row<HostData>[]
}) {
  const blocklistDelete = useAdminHostsBlocklistDelete()
  const mutate = useMutate()
  const operation = useCallback(async () => {
    await handleBatchOperation(
      hosts.map((host) =>
        blocklistDelete.delete({
          params: {
            hostkey:
              'publicKey' in host ? host.publicKey : host.original.publicKey,
          },
        }),
      ),
      {
        toastError: ({ successCount, errorCount, totalCount }) => ({
          title: `Unblocked ${pluralize(successCount, 'host')}`,
          body: `Error unblocking ${errorCount}/${totalCount} of total hosts.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `Unblocked ${pluralize(totalCount, 'host')}`,
        }),
      },
    )
    await mutate((key) => key.startsWith(adminHostsRoute))
  }, [hosts, blocklistDelete, mutate])
  return (
    <Button onClick={operation}>
      <CheckmarkOutline16 />
      Unblock {hosts.length === 1 ? 'host' : 'hosts'}
    </Button>
  )
}
