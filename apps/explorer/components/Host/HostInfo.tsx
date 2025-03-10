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
import { getHostNetAddress } from '../../lib/hostType'
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
        value={getHostNetAddress(host)}
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
        {(host.v2 ? host.v2Settings : host.settings) && (
          <Tooltip
            content={
              host.v2
                ? host.v2Settings.acceptingContracts
                : host.settings.acceptingcontracts
                ? 'Host is accepting contracts'
                : 'Host is not accepting contracts'
            }
          >
            <Text
              size="14"
              color={
                (
                  host.v2
                    ? host.v2Settings.acceptingContracts
                    : host.settings.acceptingcontracts
                )
                  ? 'green'
                  : 'subtle'
              }
              className="flex gap-1 items-center"
            >
              {host.v2 ? (
                host.v2Settings.acceptingContracts
              ) : host.settings.acceptingcontracts ? (
                <CheckmarkFilled16 />
              ) : (
                <WarningFilled16 />
              )}
              {host.v2
                ? host.v2Settings.acceptingContracts
                : host.settings.acceptingcontracts
                ? 'Accepting contracts'
                : 'Not accepting contracts'}
            </Text>
          </Tooltip>
        )}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
        {host.v2 ? (
          <Tooltip content={`Host version ${host.v2Settings.protocolVersion}`}>
            <Text size="14" color="subtle" className="flex gap-1 items-center">
              <Fork16 />
              {host.v2Settings.protocolVersion}
            </Text>
          </Tooltip>
        ) : (
          <Tooltip content={`Host version ${host.settings.version}`}>
            <Text size="14" color="subtle" className="flex gap-1 items-center">
              <Fork16 />
              {host.settings.version}
            </Text>
          </Tooltip>
        )}
        {host.location.countryCode.length ? (
          <Tooltip content={`Host located in ${host.location.countryCode}`}>
            <div className="flex gap-1 items-center">
              <Text size="14">
                {countryCodeEmoji(host.location.countryCode)}
              </Text>
              <Text size="14" color="subtle">
                {host.location.countryCode}
              </Text>
            </div>
          </Tooltip>
        ) : null}
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
