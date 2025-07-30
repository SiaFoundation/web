import { Button, MultiSelect, Paragraph } from '@siafoundation/design-system'
import { ListChecked16 } from '@siafoundation/react-icons'
import { useCallback } from 'react'
import { useDialog } from '../../contexts/dialog'
import { pluralize } from '@siafoundation/units'
import { useBlocklistUpdate } from '../../hooks/useBlocklistUpdate'

export function BulkAddBlocklist({
  multiSelect,
  hostAddresses,
}: {
  multiSelect: MultiSelect<{ id: string }>
  hostAddresses: string[]
}) {
  const { openConfirmDialog } = useDialog()
  const blocklistUpdate = useBlocklistUpdate()

  const add = useCallback(async () => {
    blocklistUpdate(hostAddresses, [])
    multiSelect.deselectAll()
  }, [blocklistUpdate, multiSelect, hostAddresses])

  return (
    <Button
      aria-label="add host addresses to blocklist"
      tip="Add host addresses to blocklist"
      onClick={() => {
        openConfirmDialog({
          title: `Add ${pluralize(
            multiSelect.selectionCount,
            'host',
          )} to blocklist`,
          action: 'Add to blocklist',
          variant: 'red',
          body: (
            <div className="flex flex-col gap-1">
              <Paragraph size="14">
                Are you sure you would like to add{' '}
                {pluralize(
                  multiSelect.selectionCount,
                  'host address',
                  'host addresses',
                )}{' '}
                to the blocklist?
              </Paragraph>
            </div>
          ),
          onConfirm: add,
        })
      }}
    >
      <ListChecked16 />
      Add hosts to blocklist
    </Button>
  )
}
