import {
  Button,
  Bullhorn16,
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useSettingsAnnounce, useTxPoolFee } from '@siafoundation/react-hostd'
import { humanSiacoin } from '@siafoundation/sia-js'
import { useCallback } from 'react'

export function AnnounceButton() {
  const { openConfirmDialog } = useDialog()
  const txpoolFee = useTxPoolFee()
  const settingsAnnounce = useSettingsAnnounce()

  const triggerConfirm = useCallback(
    () =>
      openConfirmDialog({
        title: 'Announce',
        action: (
          <>
            <Bullhorn16 />
            Announce
          </>
        ),
        variant: 'accent',
        body: (
          <div className="flex flex-col">
            <Paragraph size="14">
              Confirm to broadcast host announcement.
            </Paragraph>
            {txpoolFee.data && (
              <Paragraph size="14">
                Announcing will cost {humanSiacoin(txpoolFee.data)}.
              </Paragraph>
            )}
          </div>
        ),
        onConfirm: async () => {
          const response = await settingsAnnounce.post({})

          if (response.error) {
            triggerErrorToast('Error announcing host.')
          }
          triggerSuccessToast('Successfully broadcast host announcement.')
        },
      }),
    [openConfirmDialog, settingsAnnounce, txpoolFee]
  )

  return (
    <Button
      variant="accent"
      tip="Announce host address"
      onClick={triggerConfirm}
    >
      <Bullhorn16 />
      Announce
    </Button>
  )
}
