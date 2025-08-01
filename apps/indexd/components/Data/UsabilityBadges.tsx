import { Badge, Tooltip, cn } from '@siafoundation/design-system'
import {
  CheckmarkOutline16,
  CloseOutline16,
  Warning16,
} from '@siafoundation/react-icons'
import { Usability } from '@siafoundation/indexd-types'
import { useMemo } from 'react'

export function UsabilityBadges({
  usable,
  usability,
  className,
  showExpanded = false,
}: {
  usable: boolean
  usability?: Usability
  className?: string
  showExpanded?: boolean
}) {
  const unusableBadges = useMemo(
    () =>
      usability &&
      Object.keys(usability)
        .filter((key) => !usability[key as keyof Usability])
        .map((key) => (
          <UsabilityBadge
            key={key}
            status="unusable"
            name={camelCaseToLowerCaseSentence(key)}
          />
        )),
    [usability],
  )
  const usableBadges = useMemo(
    () =>
      usability &&
      Object.keys(usability)
        .filter((key) => usability[key as keyof Usability])
        .map((key) => (
          <UsabilityBadge
            key={key}
            status="usable"
            name={camelCaseToLowerCaseSentence(key)}
          />
        )),
    [usability],
  )
  return (
    <div className={cn('flex gap-1', className)}>
      {usable && !showExpanded ? (
        <UsabilityBadge status="usable" name="usable" />
      ) : (
        <>
          {unusableBadges}
          {usableBadges}
        </>
      )}
    </div>
  )
}

export function UsabilityBadge({
  status,
  name,
}: {
  status: 'usable' | 'warning' | 'unusable'
  name: string
}) {
  return (
    <Badge size="small" className="flex items-center gap-0.5">
      <UsabilityIndicator status={status} name={name} />
      {name}
    </Badge>
  )
}

export function UsabilityIndicator({
  status,
  name,
}: {
  status: 'usable' | 'warning' | 'unusable'
  name: string
}) {
  const tip = useMemo(
    () => ({
      usable: `${name} is usable`,
      warning: `${name} is almost usable`,
      unusable: `${name} is unusable`,
    }),
    [name],
  )
  return (
    <Tooltip content={tip[status]}>
      {status === 'usable' ? (
        <CheckmarkOutline16 className="text-green-600 scale-75" />
      ) : status === 'warning' ? (
        <Warning16 className="text-amber-600 scale-75" />
      ) : (
        <CloseOutline16 className="text-red-600 scale-75" />
      )}
    </Tooltip>
  )
}

function camelCaseToLowerCaseSentence(str: string) {
  return str.replace(/([A-Z])/g, ' $1').toLowerCase()
}
