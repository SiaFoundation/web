import {
  Button,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useAdminHostsBlocklistUpdate } from '@siafoundation/indexd-react'
import { useCallback } from 'react'
import { HostData } from '../types'
import { pluralize } from '@siafoundation/units'
import { adminHostsRoute } from '@siafoundation/indexd-types'
import { useMutate } from '@siafoundation/react-core'
import { Row } from '@tanstack/react-table'
import { CloseOutline16 } from '@siafoundation/react-icons'

export function BulkHostBlocklistAdd({
  hosts,
}: {
  hosts: HostData[] | Row<HostData>[]
}) {
  const blocklistUpdate = useAdminHostsBlocklistUpdate()
  const mutate = useMutate()
  const operation = useCallback(async () => {
    const { error } = await blocklistUpdate.put({
      payload: {
        hostKeys: hosts.map((host) =>
          'publicKey' in host ? host.publicKey : host.original.publicKey,
        ),
        reason: 'blocked by user',
      },
    })
    if (error) {
      triggerErrorToast({
        title: 'Error blocking hosts',
        body: error,
      })
    } else {
      triggerSuccessToast({
        title: `Blocked ${pluralize(hosts.length, 'host')}`,
      })
    }
    await mutate((key) => key.startsWith(adminHostsRoute))
  }, [hosts, blocklistUpdate, mutate])
  return (
    <Button onClick={operation}>
      <CloseOutline16 />
      Block {hosts.length === 1 ? 'host' : 'hosts'}
    </Button>
  )
}
