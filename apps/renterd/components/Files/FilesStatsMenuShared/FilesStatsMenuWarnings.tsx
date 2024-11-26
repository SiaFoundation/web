import {
  Button,
  Paragraph,
  Popover,
  Separator,
  Text,
} from '@siafoundation/design-system'
import { Warning16 } from '@siafoundation/react-icons'
import { useMemo } from 'react'
import { useSyncStatus } from '../../../hooks/useSyncStatus'
import { useAutopilotNotEnabled } from '../checks/useAutopilotNotConfigured'
import { useNotEnoughContracts } from '../checks/useNotEnoughContracts'

export function FilesStatsMenuWarnings() {
  const syncStatus = useSyncStatus()
  const autopilotNotEnabled = useAutopilotNotEnabled()
  const notEnoughContracts = useNotEnoughContracts()

  const syncStatusEl = useMemo(() => {
    if (!syncStatus.isSynced) {
      return (
        <div key="syncStatus" className="flex flex-col gap-1">
          <Text size="12" font="mono" weight="medium" color="amber">
            Uploads are disabled until renterd is synced.
          </Text>
          <Paragraph size="12">
            The blockchain must be fully synced before uploading files. This can
            take a while depending on your hardware and network connection.
          </Paragraph>
        </div>
      )
    }
    return null
  }, [syncStatus.isSynced])

  const autopilotNotEnabledEl = useMemo(() => {
    if (autopilotNotEnabled.active) {
      return (
        <div key="autopilotNotConfigured" className="flex flex-col gap-1">
          <Text size="12" font="mono" weight="medium" color="amber">
            Autopilot is currently disabled.
          </Text>
          <Paragraph size="12">
            Files and contracts will not be automatically maintained while
            autopilot is disabled.
          </Paragraph>
        </div>
      )
    }
    return null
  }, [autopilotNotEnabled.active])

  const notEnoughContractsEl = useMemo(() => {
    if (notEnoughContracts.active) {
      return (
        <div key="notEnoughContracts" className="flex flex-col gap-1">
          <Text size="12" font="mono" weight="medium" color="amber">
            Uploads are disabled until settings are configured.
          </Text>
          <Paragraph size="12">
            There are not enough contracts to upload data yet. Redundancy is
            configured to use {notEnoughContracts.required} shards which means
            at least that many contracts are required.
          </Paragraph>
        </div>
      )
    }
    return null
  }, [notEnoughContracts])

  const warningList = useMemo(
    () =>
      [syncStatusEl, autopilotNotEnabledEl, notEnoughContractsEl].filter(
        Boolean
      ),
    [syncStatusEl, autopilotNotEnabledEl, notEnoughContractsEl]
  )

  if (warningList.length)
    return (
      <>
        <Popover
          trigger={
            <Button variant="ghost" icon="contrast" color="amber">
              <Warning16 />
            </Button>
          }
        >
          <div className="flex flex-col gap-3 px-1 py-2">{warningList}</div>
        </Popover>
        <Separator variant="vertical" className="h-full" />
      </>
    )
}
