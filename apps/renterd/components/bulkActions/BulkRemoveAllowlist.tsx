import { Button, MultiSelect, Paragraph } from '@siafoundation/design-system'
import { ListChecked16 } from '@siafoundation/react-icons'
import { useCallback } from 'react'
import { useDialog } from '../../contexts/dialog'
import { pluralize } from '@siafoundation/units'
import { useAllowlistUpdate } from '../../hooks/useAllowlistUpdate'

export function BulkRemoveAllowlist({
  multiSelect,
  publicKeys,
}: {
  multiSelect: MultiSelect<{ id: string }>
  publicKeys: string[]
}) {
  const { openConfirmDialog } = useDialog()
  const allowlistUpdate = useAllowlistUpdate()

  const remove = useCallback(async () => {
    await allowlistUpdate([], publicKeys)
    multiSelect.deselectAll()
  }, [allowlistUpdate, multiSelect, publicKeys])

  return (
    <Button
      aria-label="remove host public keys from allowlist"
      tip="Remove host public keys from allowlist"
      onClick={() => {
        openConfirmDialog({
          title: `Remove ${pluralize(
            multiSelect.selectionCount,
            'host'
          )} from allowlist`,
          action: 'Remove from allowlist',
          variant: 'accent',
          body: (
            <div className="flex flex-col gap-1">
              <Paragraph size="14">
                Are you sure you would like to remove{' '}
                {pluralize(multiSelect.selectionCount, 'host public key')} from
                the allowlist?
              </Paragraph>
            </div>
          ),
          onConfirm: remove,
        })
      }}
    >
      <ListChecked16 />
      Remove hosts from allowlist
    </Button>
  )
}
