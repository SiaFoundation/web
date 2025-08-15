import { Button, Text, truncate } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { SidePanel } from '../SidePanel'
import { useKeys } from './useKeys'
import { useDialog } from '../../../contexts/dialog'
import { TrashCan16 } from '@siafoundation/react-icons'
import { useKeysParams } from './useKeysParams'
import { SidePanelSection } from '../SidePanelSection'
import { InfoRow } from '../PanelInfoRow'

export function SidePanelKey() {
  const { panelId, setPanelId } = useKeysParams()
  const { openDialog } = useDialog()
  // TODO: Temporary until a key detail endpoint is added.
  const keys = useKeys()
  const key = useMemo(() => keys.find((k) => k.id === panelId), [panelId, keys])
  if (!key) {
    return (
      <SidePanel heading={null}>
        <div className="flex justify-center pt-[50px]">
          <Text color="subtle">Key not found</Text>
        </div>
      </SidePanel>
    )
  }
  return (
    <SidePanel
      onClose={() => setPanelId(undefined)}
      heading={
        <Text size="18" weight="medium" ellipsis>
          Key: {truncate(key?.key, 24)}
        </Text>
      }
      actions={
        <Button
          onClick={() => openDialog('connectKeyDelete', key.id)}
          variant="red"
        >
          <TrashCan16 />
          Delete key
        </Button>
      }
    >
      <SidePanelSection heading="Info">
        <div className="flex flex-col gap-2">
          <InfoRow label="Description" value={key.description} />
          <InfoRow label="Total uses" value={key.totalUses} />
          <InfoRow label="Remaining uses" value={key.remainingUses} />
          <InfoRow label="Date created" value={key.displayFields.dateCreated} />
          <InfoRow label="Last updated" value={key.displayFields.lastUpdated} />
          <InfoRow label="Last used" value={key.displayFields.lastUsed} />
        </div>
      </SidePanelSection>
    </SidePanel>
  )
}
