import {
  Button,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useHostsBlocklistUpdate } from '@siafoundation/indexd-react'
import { useCallback } from 'react'
import { HostData } from '../types'
import { pluralize } from '@siafoundation/units'
import { hostsRoute } from '@siafoundation/indexd-types'
import { useMutate } from '@siafoundation/react-core'
import { Row } from '@tanstack/react-table'

export function BulkHostBlocklistAdd({
  hosts,
}: {
  hosts: HostData[] | Row<HostData>[]
}) {
  const blocklistUpdate = useHostsBlocklistUpdate()
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
    await mutate((key) => key.startsWith(hostsRoute))
  }, [hosts, blocklistUpdate, mutate])
  return <Button onClick={operation}>Block</Button>
}
