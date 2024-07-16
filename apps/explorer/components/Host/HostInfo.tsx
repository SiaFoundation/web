import {
  Separator,
  Text,
  Tooltip,
  ValueCopyable,
  countryCodeEmoji,
} from '@siafoundation/design-system'
import {
  CheckmarkFilled16,
  Fork16,
  Time16,
  WarningFilled16,
} from '@siafoundation/react-icons'
import type { SiaCentralHost } from '@siafoundation/sia-central-types'
import { humanDate } from '@siafoundation/units'
import { formatDistance } from 'date-fns'

type Props = {
  host: SiaCentralHost
}

export function HostInfo({ host }: Props) {
  return (
    <div className="flex flex-col">
      <ValueCopyable
        size="20"
        weight="semibold"
        value={host.net_address}
        label="network address"
        maxLength={50}
      />
      <ValueCopyable
        color="subtle"
        value={host.public_key}
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
            host.online
              ? `Host is online with ${host.estimated_uptime}% uptime`
              : `Host is offline with ${host.estimated_uptime}% uptime`
          }
        >
          <Text
            size="14"
            color={host.online ? 'green' : 'red'}
            className="flex gap-1 items-center"
          >
            {host.online ? <CheckmarkFilled16 /> : <WarningFilled16 />}
            {host.online ? 'Online' : 'Offline'}
            <Text size="14" color="verySubtle">
              {host.estimated_uptime}%
            </Text>
          </Text>
        </Tooltip>
        {host.settings && (
          <Tooltip
            content={
              host.settings.accepting_contracts
                ? 'Host is accepting contracts'
                : 'Host is not accepting contracts'
            }
          >
            <Text
              size="14"
              color={host.settings.accepting_contracts ? 'green' : 'subtle'}
              className="flex gap-1 items-center"
            >
              {host.settings.accepting_contracts ? (
                <CheckmarkFilled16 />
              ) : (
                <WarningFilled16 />
              )}
              {host.settings.accepting_contracts
                ? 'Accepting contracts'
                : 'Not accepting contracts'}
            </Text>
          </Tooltip>
        )}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
        <Tooltip content={`Host version ${host.version}`}>
          <Text size="14" color="subtle" className="flex gap-1 items-center">
            <Fork16 />
            {host.version}
          </Text>
        </Tooltip>
        <Tooltip content={`Host located in ${host.country_code}`}>
          <div className="flex gap-1 items-center">
            <Text size="14">{countryCodeEmoji(host.country_code)}</Text>
            <Text size="14" color="subtle">
              {host.country_code}
            </Text>
          </div>
        </Tooltip>
        <Tooltip
          content={`Host first seen at ${humanDate(host.first_seen_timestamp, {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}`}
        >
          <Text size="14" color="subtle" className="flex gap-1 items-center">
            <Time16 />
            {formatDistance(new Date(host.first_seen_timestamp), new Date())}{' '}
            old
          </Text>
        </Tooltip>
      </div>
    </div>
  )
}
