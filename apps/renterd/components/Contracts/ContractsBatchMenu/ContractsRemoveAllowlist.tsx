import { Button, Paragraph } from '@siafoundation/design-system'
import { ListChecked16 } from '@siafoundation/react-icons'
import { useCallback, useMemo } from 'react'
import { useDialog } from '../../../contexts/dialog'
import { useContracts } from '../../../contexts/contracts'
import { pluralize } from '@siafoundation/units'
import { useAllowlistUpdate } from '../../../hooks/useAllowlistUpdate'

export function ContractsRemoveAllowlist() {
  const { multiSelect } = useContracts()

  const publicKeys = useMemo(
    () =>
      Object.entries(multiSelect.selectionMap).map(([_, item]) => item.hostKey),
    [multiSelect.selectionMap]
  )
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
      Remove from allowlist
    </Button>
  )
}
