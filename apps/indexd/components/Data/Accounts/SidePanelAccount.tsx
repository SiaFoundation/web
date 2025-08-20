import { Button, Text, truncate } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { SidePanel } from '../SidePanel'
import { useAccounts } from './useAccounts'
import { useDialog } from '../../../contexts/dialog'
import { TrashCan16 } from '@siafoundation/react-icons'
import { useAccountsParams } from './useAccountsParams'
import { InfoRow } from '../PanelInfoRow'
import { SidePanelSection } from '../SidePanelSection'

export function SidePanelAccount() {
  const { panelId, setPanelId } = useAccountsParams()
  const { openDialog } = useDialog()
  // TODO: Temporary until an account detail endpoint is added.
  const accounts = useAccounts()
  const account = useMemo(
    () => accounts.find((a) => a.id === panelId),
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
        <Text size="18" weight="medium" ellipsis>
          Account: {truncate(account?.publicKey, 24)}
        </Text>
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
