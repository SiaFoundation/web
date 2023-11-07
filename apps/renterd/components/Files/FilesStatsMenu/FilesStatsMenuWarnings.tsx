import { Text, Tooltip } from '@siafoundation/design-system'
import { Warning16 } from '@siafoundation/react-icons'
import { useContractSetMismatch } from '../checks/useContractSetMismatch'

export function FilesStatsMenuWarnings() {
  const contractSetMismatch = useContractSetMismatch()

  // warn about contract set mismatch
  if (contractSetMismatch.active) {
    return (
      <Tooltip
        align="start"
        content={
          <>
            The autopilot contract set does not match the default contract set.
            This means that by default workers will not upload data to contracts
            that autopilot manages. Unless these contract are being manually
            maintained, this will result in data loss. Continue with caution or
            update the autopilot contract set to match the default contract set.
          </>
        }
      >
        <div className="flex gap-1">
          <Text size="12" font="mono" weight="medium" color="amber">
            <Warning16 />
          </Text>
          <Text size="12" font="mono" weight="medium" color="amber">
            Uploaded data will not be managed by autopilot.
          </Text>
        </div>
      </Tooltip>
    )
  }

  return null
}
