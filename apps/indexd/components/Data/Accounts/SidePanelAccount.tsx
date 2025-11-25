import {
  Button,
  RemoteDataStates,
  Text,
  useRemoteData,
} from '@siafoundation/design-system'
import { SidePanel } from '../SidePanel'
import { useDialog } from '../../../contexts/dialog'
import { TrashCan16 } from '@siafoundation/react-icons'
import { useAccountsParams } from './useAccountsParams'
import { InfoRow } from '../PanelInfoRow'
import { SidePanelSection } from '../SidePanelSection'
import { SidePanelHeadingCopyable } from '../SidePanelHeadingCopyable'
import { useAdminAccount } from '@siafoundation/indexd-react'
import { SidePanelSkeleton } from '../SidePanelSkeleton'
import { transformAccount } from './transform'

export function SidePanelAccount() {
  const { panelId, setPanelId } = useAccountsParams()
  const { openDialog } = useDialog()
  const account = useAdminAccount({
    disabled: !panelId,
    params: {
      accountkey: panelId!,
    },
  })
  const data = useRemoteData(
    {
      account,
    },
    ({ account }) => transformAccount(account),
  )
  return (
    <RemoteDataStates
      data={data}
      loading={
        <SidePanelSkeleton withActions onClose={() => setPanelId(undefined)} />
      }
      notFound={
        <SidePanel heading={null}>
          <div className="flex justify-center pt-[50px]">
            <Text color="subtle">Account not found</Text>
          </div>
        </SidePanel>
      }
      loaded={(account) => (
        <SidePanel
          onClose={() => setPanelId(undefined)}
          heading={
            <SidePanelHeadingCopyable
              heading="Account"
              value={account.id}
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
                label="Description"
                value={account.description}
                variant="column"
              />
              <InfoRow
                label="Service account"
                value={account.serviceAccount ? 'Yes' : 'No'}
              />
              <InfoRow
                label="Max pinned data"
                value={account.displayFields.maxPinnedData}
              />
              <InfoRow
                label="Pinned data"
                value={account.displayFields.pinnedData}
              />
              <InfoRow
                label="Last used"
                value={account.displayFields.lastUsed}
              />
              <InfoRow label="Logo URL" value={account.logoURL} />
              <InfoRow label="Service URL" value={account.serviceURL} />
            </div>
          </SidePanelSection>
        </SidePanel>
      )}
    />
  )
}
