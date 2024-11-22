import { Button, Paragraph } from '@siafoundation/design-system'
import { ListChecked16 } from '@siafoundation/react-icons'
import { useCallback, useMemo } from 'react'
import { useDialog } from '../../../contexts/dialog'
import { useContracts } from '../../../contexts/contracts'
import { pluralize } from '@siafoundation/units'
import { useBlocklistUpdate } from '../../../hooks/useBlocklistUpdate'

export function ContractsRemoveBlocklist() {
  const { multiSelect } = useContracts()

  const hostAddresses = useMemo(
    () =>
      Object.entries(multiSelect.selectionMap).map(([_, item]) => item.hostIp),
    [multiSelect.selectionMap]
  )
  const { openConfirmDialog } = useDialog()
  const blocklistUpdate = useBlocklistUpdate()

  const remove = useCallback(async () => {
    blocklistUpdate([], hostAddresses)
    multiSelect.deselectAll()
  }, [blocklistUpdate, multiSelect, hostAddresses])

  return (
    <Button
      aria-label="remove host addresses from blocklist"
      tip="Remove host addresses from blocklist"
      onClick={() => {
        openConfirmDialog({
          title: `Remove ${pluralize(
            multiSelect.selectionCount,
            'host'
          )} from blocklist`,
          action: 'Remove from blocklist',
          variant: 'red',
          body: (
            <div className="flex flex-col gap-1">
              <Paragraph size="14">
                Are you sure you would like to remove{' '}
                {pluralize(
                  multiSelect.selectionCount,
                  'host address',
                  'host addresses'
                )}{' '}
                from the blocklist?
              </Paragraph>
            </div>
          ),
          onConfirm: remove,
        })
      }}
    >
      <ListChecked16 />
      Remove from blocklist
    </Button>
  )
}
