import { Button, MultiSelect, Paragraph } from '@siafoundation/design-system'
import { ListChecked16 } from '@siafoundation/react-icons'
import { useCallback } from 'react'
import { useDialog } from '../../contexts/dialog'
import { pluralize } from '@siafoundation/units'
import { useAllowlistUpdate } from '../../hooks/useAllowlistUpdate'

export function BulkAddAllowlist({
  multiSelect,
  publicKeys,
}: {
  multiSelect: MultiSelect<{ id: string }>
  publicKeys: string[]
}) {
  const { openConfirmDialog } = useDialog()
  const allowlistUpdate = useAllowlistUpdate()

  const add = useCallback(async () => {
    allowlistUpdate(publicKeys, [])
    multiSelect.deselectAll()
  }, [allowlistUpdate, multiSelect, publicKeys])

  return (
    <Button
      aria-label="add host public keys to allowlist"
      tip="Add host public keys to allowlist"
      onClick={() => {
        openConfirmDialog({
          title: `Add ${pluralize(
            multiSelect.selectionCount,
            'host',
          )} to allowlist`,
          action: 'Add to allowlist',
          variant: 'accent',
          body: (
            <div className="flex flex-col gap-1">
              <Paragraph size="14">
                Are you sure you would like to add{' '}
                {pluralize(multiSelect.selectionCount, 'host public key')} to
                the allowlist?
              </Paragraph>
            </div>
          ),
          onConfirm: add,
        })
      }}
    >
      <ListChecked16 />
      Add hosts to allowlist
    </Button>
  )
}
