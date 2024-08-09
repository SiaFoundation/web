'use client'

import { Avatar } from '../core/Avatar'
import { Link } from '../core/Link'
import { Tooltip } from '../core/Tooltip'
import { EntityType, getEntityTypeLabel } from '@siafoundation/units'

type Props = {
  initials?: string
  type?: EntityType
  label?: string
  href?: string
  src?: string
  shape?: 'square' | 'circle'
}

export function EntityAvatar({
  type,
  label,
  initials,
  href,
  src,
  shape,
}: Props) {
  const avatarEl = (
    <Avatar
      interactive={!!href}
      fallback={initials || (type && initializeWords(type || label || ''))}
      src={src}
      shape={
        shape ||
        (!type || type === 'address' || type === 'block' ? 'square' : 'circle')
      }
    />
  )
  const linkEl = href && (
    <Link href={href} underline="none">
      {avatarEl}
    </Link>
  )
  const el = linkEl || avatarEl

  if (type) {
    return (
      <Tooltip content={label || getEntityTypeLabel(type)}>
        <div className="">{el}</div>
      </Tooltip>
    )
  }

  return el
}

function initializeWords(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase)
    .join('')
}
