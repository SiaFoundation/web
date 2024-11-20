import {
  Separator,
  Text,
  Tooltip,
  ValueCopyable,
  countryCodeEmoji,
} from '@siafoundation/design-system'
import { ExplorerHost } from '@siafoundation/explored-types'
import {
  CheckmarkFilled16,
  Fork16,
  Time16,
  WarningFilled16,
} from '@siafoundation/react-icons'
import { humanDate } from '@siafoundation/units'
import { formatDistance } from 'date-fns'

type Props = {
  host: ExplorerHost
}

export function HostInfo({ host }: Props) {
  const estimatedUptime =
    host.totalScans == 0
      ? 0
      : (host.successfulInteractions / host.totalScans) * 100
  return (
    <div className="flex flex-col">
      <ValueCopyable
        size="20"
        weight="semibold"
        value={host.netAddress}
        label="network address"
        maxLength={50}
      />
      <ValueCopyable
        color="subtle"
        value={host.publicKey}
        label="public key"
        maxLength={30}
      />
      <Separator
        className="w-full mt-1 mb-1 !border-gray-200/70 dark:!border-graydark-100"
        color="verySubtle"
      />
      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center pb-1">
        <Tooltip
          content={
            host.lastScanSuccessful
              ? `Host is online with ${estimatedUptime}% uptime`
              : `Host is offline with ${estimatedUptime}% uptime`
          }
        >
          <Text
            size="14"
            color={host.lastScanSuccessful ? 'green' : 'red'}
            className="flex gap-1 items-center"
          >
            {host.lastScanSuccessful ? (
              <CheckmarkFilled16 />
            ) : (
              <WarningFilled16 />
            )}
            {host.lastScanSuccessful ? 'Online' : 'Offline'}
            <Text size="14" color="verySubtle">
              {estimatedUptime}%
            </Text>
          </Text>
        </Tooltip>
        {host.settings && (
          <Tooltip
            content={
              host.settings.acceptingcontracts
                ? 'Host is accepting contracts'
                : 'Host is not accepting contracts'
            }
          >
            <Text
              size="14"
              color={host.settings.acceptingcontracts ? 'green' : 'subtle'}
              className="flex gap-1 items-center"
            >
              {host.settings.acceptingcontracts ? (
                <CheckmarkFilled16 />
              ) : (
                <WarningFilled16 />
              )}
              {host.settings.acceptingcontracts
                ? 'Accepting contracts'
                : 'Not accepting contracts'}
            </Text>
          </Tooltip>
        )}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
        <Tooltip content={`Host version ${host.settings.version}`}>
          <Text size="14" color="subtle" className="flex gap-1 items-center">
            <Fork16 />
            {host.settings.version}
          </Text>
        </Tooltip>
        <Tooltip content={`Host located in ${host.countryCode}`}>
          <div className="flex gap-1 items-center">
            <Text size="14">{countryCodeEmoji(host.countryCode)}</Text>
            <Text size="14" color="subtle">
              {host.countryCode}
            </Text>
          </div>
        </Tooltip>
        <Tooltip
          content={`Host first seen at ${humanDate(host.knownSince, {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}`}
        >
          <Text size="14" color="subtle" className="flex gap-1 items-center">
            <Time16 />
            {formatDistance(new Date(host.knownSince), new Date())} old
          </Text>
        </Tooltip>
      </div>
    </div>
  )
}
