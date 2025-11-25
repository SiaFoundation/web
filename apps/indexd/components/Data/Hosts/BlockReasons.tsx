import { Badge, Tooltip } from '@siafoundation/design-system'
import { HostData } from './types'

export function BlockReasons({ host }: { host: HostData }) {
  if (
    !host.blocked ||
    !host.blockedReasons ||
    host.blockedReasons.length === 0
  ) {
    return null
  }
  return (
    <div className="flex items-center justify-start gap-1">
      {host.blockedReasons.map((reason) => (
        <Tooltip content={`block reason: ${reason}`} key={reason}>
          <Badge size="small" key={reason}>
            {reason}
          </Badge>
        </Tooltip>
      ))}
    </div>
  )
}
