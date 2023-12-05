import { Text } from '../core/Text'
import { Link } from '../core/Link'
import { stripPrefix } from '../lib/utils'
import { EntityType, getEntityDisplayLength } from '../lib/entityTypes'
import { cx } from 'class-variance-authority'

type Props = {
  value: string
  displayValue?: string
  type?: EntityType
  label?: string
  href?: string
  size?: React.ComponentProps<typeof Text>['size']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  maxLength?: number
  color?: React.ComponentProps<typeof Text>['color']
  className?: string
  menu: React.ReactNode
}

export function ValueMenu({
  value,
  displayValue,
  type,
  href,
  maxLength: customMaxLength,
  size,
  scaleSize,
  color = 'contrast',
  menu,
  className,
}: Props) {
  const maxLength = customMaxLength || getEntityDisplayLength(type)
  const cleanValue = stripPrefix(value)
  const renderValue = displayValue || cleanValue

  const text = `${renderValue?.slice(0, maxLength)}${
    (renderValue?.length || 0) > maxLength ? '...' : ''
  }`

  return (
    <div className={cx('flex items-center', className)}>
      {href ? (
        <Link
          href={href}
          underline="hover"
          size={size}
          scaleSize={scaleSize}
          color={color}
          ellipsis
        >
          {text}
        </Link>
      ) : (
        <Text size={size} scaleSize={scaleSize} color={color} ellipsis>
          {text}
        </Text>
      )}
      <div className="ml-1 flex items-center">{menu}</div>
    </div>
  )
}
