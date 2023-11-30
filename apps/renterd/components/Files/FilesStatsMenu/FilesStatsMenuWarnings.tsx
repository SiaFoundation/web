import {
  Button,
  Paragraph,
  Popover,
  Separator,
  Text,
} from '@siafoundation/design-system'
import { Warning16 } from '@siafoundation/react-icons'
import { useContractSetMismatch } from '../checks/useContractSetMismatch'
import { useMemo } from 'react'

export function FilesStatsMenuWarnings() {
  const contractSetMismatch = useContractSetMismatch()

  const contractSetMismatchEl = useMemo(() => {
    // warn about contract set mismatch
    if (contractSetMismatch.active) {
      return (
        <div className="flex flex-col gap-2">
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

  if (!contractSetMismatchEl) {
    return null
  }

  return (
    <>
      <Popover
        trigger={
          <Button variant="ghost" icon="contrast" color="amber">
            <Warning16 />
          </Button>
        }
      >
        <div className="px-1 py-2">{contractSetMismatchEl}</div>
      </Popover>
      <Separator variant="vertical" className="h-full" />
    </>
  )
}
