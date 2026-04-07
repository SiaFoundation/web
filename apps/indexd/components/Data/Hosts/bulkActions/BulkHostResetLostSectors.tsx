import { Button, handleBatchOperation } from '@siafoundation/design-system'
import { useAdminHostResetLostSectors } from '@siafoundation/indexd-react'
import { useCallback, useMemo } from 'react'
import { pluralize } from '@siafoundation/units'
import { HostData } from '../types'
import { useMutate } from '@siafoundation/react-core'
import { adminHostRoute, adminHostsRoute } from '@siafoundation/indexd-types'
import { Row } from '@tanstack/react-table'
import { ResetAlt16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../../contexts/dialog'

export function BulkHostResetLostSectors({
  hosts,
}: {
  hosts: HostData[] | Row<HostData>[]
}) {
  const resetLostSectors = useAdminHostResetLostSectors()
  const mutate = useMutate()
  const { openConfirmDialog } = useDialog()

  const hostsWithLostSectors = useMemo(
    () =>
      hosts
        .map((host) =>
          'publicKey' in host ? host : (host.original as HostData)
        )
        .filter((host) => host.lostSectors > 0),
    [hosts]
  )

  const operation = useCallback(async () => {
    await handleBatchOperation(
      hostsWithLostSectors.map((host) =>
        resetLostSectors.post({
          params: {
            hostkey: host.publicKey,
          },
        })
      ),
      {
        toastError: ({ successCount, errorCount, totalCount }) => ({
          title: `Reset lost sectors for ${pluralize(successCount, 'host')}`,
          body: `Error resetting lost sectors for ${errorCount}/${totalCount} total hosts.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `Reset lost sectors for ${pluralize(totalCount, 'host')}`,
        }),
      }
    )
    await mutate((key) => key.startsWith(adminHostsRoute))
    await Promise.all(
      hostsWithLostSectors.map((host) =>
        mutate((key) =>
          key.startsWith(
            adminHostRoute.replace(':hostkey', host.publicKey)
          )
        )
      )
    )
  }, [hostsWithLostSectors, resetLostSectors, mutate])

  if (hostsWithLostSectors.length === 0) {
    return null
  }

  return (
    <Button
      onClick={() =>
        openConfirmDialog({
          title: `Reset lost sectors for ${pluralize(hostsWithLostSectors.length, 'host')}?`,
          action: 'Reset',
          variant: 'red',
          body: null,
          onConfirm: operation,
        })
      }
    >
      <ResetAlt16 />
      Reset lost sectors{hosts.length > 1 ? ` (${hostsWithLostSectors.length})` : ''}
    </Button>
  )
}
