import {
  Button,
  handleBatchOperation,
  MultiSelect,
  MultiSelectRow,
} from '@siafoundation/design-system'
import { DataView16 } from '@siafoundation/react-icons'
import { useHostScan } from '@siafoundation/renterd-react'
import { useCallback } from 'react'
import { pluralize, secondsInMilliseconds } from '@siafoundation/units'

export function BulkRescanHosts<T extends MultiSelectRow>({
  multiSelect,
  publicKeys,
}: {
  multiSelect: MultiSelect<T>
  publicKeys: string[]
}) {
  const scan = useHostScan()
  const scanAll = useCallback(async () => {
    await handleBatchOperation(
      publicKeys.map((publicKey) =>
        scan.post({
          params: {
            hostkey: publicKey,
          },
          payload: {
            timeout: secondsInMilliseconds(30),
          },
        })
      ),
      {
        toastError: ({ successCount, errorCount, totalCount }) => ({
          title: `Rescanning ${pluralize(successCount, 'host')}`,
          body: `Error starting rescan for ${errorCount}/${totalCount} of total hosts.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `Rescanning ${pluralize(totalCount, 'host')}`,
        }),
        after: () => {
          multiSelect.deselectAll()
        },
      }
    )
  }, [multiSelect, publicKeys, scan])

  return (
    <Button
      aria-label="rescan selected hosts"
      tip="Rescan selected hosts"
      onClick={scanAll}
    >
      <DataView16 />
    </Button>
  )
}
