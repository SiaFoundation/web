import { EntityType } from '../lib/entityTypes'
import { EntityAvatar } from './EntityAvatar'
import { cx } from 'class-variance-authority'

export type EntityListItemLayoutProps = {
  label?: string
  onClick?: () => void
  href?: string
  type?: EntityType
  initials?: string
  avatarShape?: 'square' | 'circle'
  avatar?: string
  children?: React.ReactNode
}

export function EntityListItemLayout({
  label,
  type,
  avatar,
  avatarShape,
  initials,
  href,
  onClick,
  children,
}: EntityListItemLayoutProps) {
  return (
    <div className={cx('flex gap-4 p-4', itemBorderStyles())} onClick={onClick}>
      <EntityAvatar
        label={label}
        type={type}
        shape={avatarShape}
        src={avatar}
        initials={initials || initializeWords(type || label || '')}
        href={href}
      />
      {children}
    </div>
  )
}

function itemBorderStyles() {
  return cx(
    'border-t border-gray-200 dark:border-graydark-300',
    'first:border-none'
  )
}

function initializeWords(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}
