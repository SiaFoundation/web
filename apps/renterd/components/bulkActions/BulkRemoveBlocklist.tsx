import { Button, MultiSelect, Paragraph } from '@siafoundation/design-system'
import { ListChecked16 } from '@siafoundation/react-icons'
import { useCallback } from 'react'
import { useDialog } from '../../contexts/dialog'
import { pluralize } from '@siafoundation/units'
import { useBlocklistUpdate } from '../../hooks/useBlocklistUpdate'

export function BulkRemoveBlocklist({
  multiSelect,
  hostAddresses,
}: {
  multiSelect: MultiSelect<{ id: string }>
  hostAddresses: string[]
}) {
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
            'host',
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
                  'host addresses',
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
      Remove hosts from blocklist
    </Button>
  )
}
