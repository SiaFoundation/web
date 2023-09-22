'use client'

import { Text } from '../core/Text'
import { Button } from '../core/Button'
import { Link } from '../core/Link'
import { Copy16 } from '@siafoundation/react-icons'
import { copyToClipboard } from '../lib/clipboard'
import { stripPrefix } from '../lib/utils'
import { EntityType, getEntityTypeLabel } from '../lib/entityTypes'
import { cx } from 'class-variance-authority'

type Props = {
  value: string
  displayValue?: string
  type?: EntityType
  label?: string
  href?: string
  size?: React.ComponentProps<typeof Text>['size']
  weight?: React.ComponentProps<typeof Text>['weight']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  maxLength?: number
  color?: React.ComponentProps<typeof Text>['color']
  className?: string
}

export function ValueCopyable({
  value,
  displayValue,
  type,
  label: customLabel,
  href,
  maxLength: customMaxLength,
  size,
  scaleSize,
  weight,
  color = 'contrast',
  className,
}: Props) {
  const label = customLabel || getEntityTypeLabel(type)
  const maxLength = customMaxLength || (type === 'ip' ? 20 : 12)
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
          weight={weight}
          ellipsis
        >
          {text}
        </Link>
      ) : (
        <Text
          size={size}
          scaleSize={scaleSize}
          color={color}
          weight={weight}
          ellipsis
        >
          {text}
        </Text>
      )}
      <div className="ml-1 flex items-center">
        <Button
          variant="ghost"
          size="none"
          onClick={(e) => {
            e.stopPropagation()
            copyToClipboard(cleanValue, label)
          }}
        >
          <Text color={color}>
            <Copy16 className={size === '10' ? 'scale-75' : 'scale-90'} />
          </Text>
        </Button>
      </div>
    </div>
  )
}
