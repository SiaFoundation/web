import { Text, truncate } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { SidePanel } from '../SidePanel'
import { useAccounts } from './useAccounts'
import { useAccountsParams } from './useAccountsParams'

export function SidePanelAccount() {
  const { panelId, setPanelId } = useAccountsParams()
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
    >
      <Text color="subtle" className="flex justify-center pt-[50px]">
        No further information on accounts yet
      </Text>
    </SidePanel>
  )
}
