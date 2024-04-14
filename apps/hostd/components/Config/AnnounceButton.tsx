import {
  Button,
  Paragraph,
  minutesInMilliseconds,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { Bullhorn16 } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'
import {
  useSettings,
  useSettingsAnnounce,
  useStateHost,
  useTxPoolFee,
} from '@siafoundation/hostd-react'
import { humanSiacoin } from '@siafoundation/units'
import { useCallback } from 'react'
import BigNumber from 'bignumber.js'

export function AnnounceButton() {
  const { openConfirmDialog } = useDialog()
  const txpoolFee = useTxPoolFee()
  const settingsAnnounce = useSettingsAnnounce()
  const host = useStateHost()
  const settings = useSettings({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })

  const needsToAnnounce =
    host.data?.lastAnnouncement?.address !== settings.data?.netAddress

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
                Announcing will cost{' '}
                {humanSiacoin(new BigNumber(txpoolFee.data).times(1000))}.
              </Paragraph>
            )}
          </div>
        ),
        onConfirm: async () => {
          const response = await settingsAnnounce.post({})

          if (response.error) {
            triggerErrorToast({ title: 'Error announcing host' })
            return
          }
          triggerSuccessToast({
            title: 'Successfully broadcast host announcement',
          })
        },
      }),
    [openConfirmDialog, settingsAnnounce, txpoolFee]
  )

  return (
    <Button
      tip="Announce host address"
      onClick={triggerConfirm}
      disabled={!needsToAnnounce}
    >
      <Bullhorn16 />
      Announce
    </Button>
  )
}
