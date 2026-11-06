import {
  Button,
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useAdminHostsScan } from '@siafoundation/indexd-react'
import { useCallback } from 'react'
import { DataView16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../contexts/dialog'

// Scanning all hosts runs in the background, so there is nothing to refetch
// when the request returns.
export function HostsScan() {
  const scan = useAdminHostsScan()
  const { openConfirmDialog } = useDialog()

  const queueScan = useCallback(
    async (force: boolean) => {
      const response = await scan.post({
        params: { force },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Failed to start scan',
          body: response.error,
        })
      } else {
        triggerSuccessToast({
          title: force
            ? 'Scan of all hosts started'
            : 'Scan of due hosts started',
        })
      }
    },
    [scan],
  )

  return (
    <>
      <Button
        tip="Scan hosts that are new or past their next scan time"
        onClick={() => queueScan(false)}
      >
        <DataView16 />
        Scan due hosts
      </Button>
      <Button
        tip="Scan every known host, even if it is not due"
        onClick={() =>
          openConfirmDialog({
            title: 'Scan all hosts?',
            action: 'Scan all hosts',
            variant: 'accent',
            body: (
              <Paragraph size="14">
                indexd will connect to every known host, even ones that are not
                due, which can take a while with many hosts. Hosts that were
                blocked for being unusable are unblocked if they are usable
                again and have no active contracts.
              </Paragraph>
            ),
            onConfirm: () => queueScan(true),
          })
        }
      >
        <DataView16 />
        Scan all hosts
      </Button>
    </>
  )
}
