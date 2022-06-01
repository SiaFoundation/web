import { Avatar, Box, NextLink, Tooltip } from '@siafoundation/design-system'
import { useMemo } from 'react'
import {
  EntityType,
  getEntityTypeInitials,
  getEntityTypeLabel,
} from '../config/types'
import { getHrefForType } from '../lib/utils'

type Props = {
  initials?: string
  type?: EntityType
  value?: string
}

export function EntityAvatar({ initials, type, value }: Props) {
  const href = useMemo(() => getHrefForType(type, value), [type, value])
  const avatarEl = (
    <Avatar
      interactive={!!href}
      fallback={initials || getEntityTypeInitials(type)}
      shape={
        !type || type === 'address' || type === 'block' ? 'square' : 'circle'
      }
    />
  )
  const linkEl = href && <NextLink href={href}>{avatarEl}</NextLink>
  const el = linkEl || avatarEl

  if (type) {
    return (
      <Tooltip content={getEntityTypeLabel(type)}>
        <Box>{el}</Box>
      </Tooltip>
    )
  }

  return el
}
