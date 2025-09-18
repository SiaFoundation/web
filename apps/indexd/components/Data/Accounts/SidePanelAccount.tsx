import { Button, Text } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { SidePanel } from '../SidePanel'
import { useAccounts } from './useAccounts'
import { useDialog } from '../../../contexts/dialog'
import { TrashCan16 } from '@siafoundation/react-icons'
import { useAccountsParams } from './useAccountsParams'
import { InfoRow } from '../PanelInfoRow'
import { SidePanelSection } from '../SidePanelSection'
import { SidePanelHeadingCopyable } from '../SidePanelHeadingCopyable'

export function SidePanelAccount() {
  const { panelId, setPanelId } = useAccountsParams()
  const { openDialog } = useDialog()
  // TODO: Temporary until an account detail endpoint is added.
  const accounts = useAccounts()
  const account = useMemo(
    () => accounts.data?.find((a) => a.id === panelId),
    [panelId, accounts],
  )
  if (!account) {
    return (
      <SidePanel heading={null}>
        <div className="flex justify-center pt-[50px]">
          <Text color="subtle">Account not found</Text>
        </div>
      </SidePanel>
    )
  }
  return (
    <SidePanel
      onClose={() => setPanelId(undefined)}
      heading={
        <SidePanelHeadingCopyable
          heading="Account"
          value={account?.publicKey}
          label="account"
        />
      }
      actions={
        <Button
          onClick={() => openDialog('accountDelete', account.id)}
          variant="red"
        >
          <TrashCan16 />
          Delete account
        </Button>
      }
    >
      <SidePanelSection heading="Info">
        <div className="flex flex-col gap-2">
          <InfoRow
            label="Service account"
            value={account.serviceAccount ? 'Yes' : 'No'}
          />
          <InfoRow
            label="Max pinned data"
            value={account.displayFields.maxPinnedData}
          />
        </div>
      </SidePanelSection>
    </SidePanel>
  )
}
