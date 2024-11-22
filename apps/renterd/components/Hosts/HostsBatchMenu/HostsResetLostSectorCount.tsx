import { Button, handleBatchOperation } from '@siafoundation/design-system'
import { ResetAlt16 } from '@siafoundation/react-icons'
import { useHostResetLostSectorCount } from '@siafoundation/renterd-react'
import { useCallback, useMemo } from 'react'
import { pluralize } from '@siafoundation/units'
import { useHosts } from '../../../contexts/hosts'

export function HostsResetLostSectorCount() {
  const resetLostSectors = useHostResetLostSectorCount()
  const { multiSelect } = useHosts()

  const publicKeys = useMemo(
    () =>
      Object.entries(multiSelect.selectionMap).map(
        ([_, item]) => item.publicKey
      ),
    [multiSelect.selectionMap]
  )
  const resetAll = useCallback(async () => {
    await handleBatchOperation(
      publicKeys.map((publicKey) =>
        resetLostSectors.post({
          params: {
            hostkey: publicKey,
          },
        })
      ),
      {
        toastError: ({ successCount, errorCount, totalCount }) => ({
          title: `Reset lost sector count for ${pluralize(
            successCount,
            'host'
          )}`,
          body: `Error reseting lost sector count for ${errorCount}/${totalCount} total hosts.`,
        }),
        toastSuccess: ({ totalCount }) => ({
          title: `Reset lost sector count for ${pluralize(totalCount, 'host')}`,
        }),
        after: () => {
          multiSelect.deselectAll()
        },
      }
    )
  }, [multiSelect, publicKeys, resetLostSectors])

  return (
    <Button
      aria-label="reset lost sector count for hosts"
      tip="Reset lost sector count for hosts"
      onClick={resetAll}
    >
      <ResetAlt16 />
    </Button>
  )
}
