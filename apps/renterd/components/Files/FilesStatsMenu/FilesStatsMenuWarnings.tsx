import { Link, Text, Tooltip, Warning16 } from '@siafoundation/design-system'
import { useAutopilotConfig } from '@siafoundation/react-renterd'
import { useIsApcsEqDcs } from '../../../hooks/useIsApcsEqDcs'
import { routes } from '../../../config/routes'
import { useContractSetSettings } from '../../../hooks/useContractSetSettings'
import { useApp } from '../../../contexts/app'

export function FilesStatsMenuWarnings() {
  const { autopilot } = useApp()
  const apc = useAutopilotConfig({
    config: {
      swr: {
        errorRetryCount: 0,
      },
    },
  })
  const css = useContractSetSettings()
  const isApcsEqDcs = useIsApcsEqDcs()

  let warning = 'none'

  if (
    autopilot.state === 'on' &&
    !isApcsEqDcs.isValidating &&
    !isApcsEqDcs.data
  ) {
    warning = 'contractSetMismatch'
  }

  if (autopilot.state === 'on' && apc.error) {
    warning = 'setupAutopilot'
  }

  if (css.data && !css.data?.default) {
    warning = 'setupDefaultContractSet'
  }

  return (
    <>
      {warning === 'setupDefaultContractSet' && (
        <div className="flex gap-1">
          <Text size="12" font="mono" weight="medium" color="amber">
            <Warning16 />
          </Text>
          <Text size="12" font="mono" weight="medium" color="amber">
            Configure a default contract set to get started.{' '}
            <Link
              underline="hover"
              size="12"
              font="mono"
              weight="medium"
              color="amber"
              href={routes.config.index}
            >
              Configuration →
            </Link>
          </Text>
        </div>
      )}
      {warning === 'setupAutopilot' && (
        <div className="flex gap-1">
          <Text size="12" font="mono" weight="medium" color="amber">
            <Warning16 />
          </Text>
          <Text size="12" font="mono" weight="medium" color="amber">
            Configure autopilot to get started.{' '}
            <Link
              underline="hover"
              size="12"
              font="mono"
              weight="medium"
              color="amber"
              href={routes.autopilot.index}
            >
              Autopilot →
            </Link>
          </Text>
        </div>
      )}
      {warning === 'contractSetMismatch' && (
        <Tooltip
          align="start"
          content={
            <>
              The autopilot contract set does not match the default contract
              set. This means that by default workers will not upload data to
              contracts that autopilot manages. Unless these contract are being
              manually maintained, this will result in data loss. Continue with
              caution or update the autopilot contract set to match the default
              contract set.
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
      )}
    </>
  )
}
