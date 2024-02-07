import {
  Button,
  Code,
  Paragraph,
  Popover,
  Separator,
  Text,
} from '@siafoundation/design-system'
import { Warning16 } from '@siafoundation/react-icons'
import { useContractSetMismatch } from '../checks/useContractSetMismatch'
import { useMemo } from 'react'
import { useSyncStatus } from '../../../hooks/useSyncStatus'
import { useAutopilotNotConfigured } from '../checks/useAutopilotNotConfigured'
import { useNotEnoughContracts } from '../checks/useNotEnoughContracts'

export function FilesStatsMenuWarnings() {
  const syncStatus = useSyncStatus()
  const contractSetMismatch = useContractSetMismatch()
  const autopilotNotConfigured = useAutopilotNotConfigured()
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

  const autopilotNotConfiguredEl = useMemo(() => {
    if (autopilotNotConfigured.active) {
      return (
        <div key="autopilotNotConfigured" className="flex flex-col gap-1">
          <Text size="12" font="mono" weight="medium" color="amber">
            Uploads are disabled until settings are configured.
          </Text>
          <Paragraph size="12">
            Before you can upload files you must configure your settings. Once
            configured, <Code>renterd</Code> will find contracts with hosts
            based on the settings you choose. <Code>renterd</Code> will also
            repair your data as hosts come and go.
          </Paragraph>
        </div>
      )
    }
    return null
  }, [autopilotNotConfigured.active])

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

  const contractSetMismatchEl = useMemo(() => {
    if (contractSetMismatch.active) {
      return (
        <div key="contractSetMismatch" className="flex flex-col gap-1">
          <Text size="12" font="mono" weight="medium" color="amber">
            Uploaded data will not be managed by autopilot.
          </Text>
          <Paragraph size="12">
            The autopilot contract set does not match the default contract set.
            This means that by default workers will not upload data to contracts
            that autopilot manages. Unless these contract are being manually
            maintained, this will result in data loss. Continue with caution or
            update the autopilot contract set to match the default contract set.
          </Paragraph>
        </div>
      )
    }
    return null
  }, [contractSetMismatch.active])

  const warningList = useMemo(
    () =>
      [
        syncStatusEl,
        autopilotNotConfiguredEl,
        notEnoughContractsEl,
        contractSetMismatchEl,
      ].filter(Boolean),
    [
      syncStatusEl,
      autopilotNotConfiguredEl,
      notEnoughContractsEl,
      contractSetMismatchEl,
    ]
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
