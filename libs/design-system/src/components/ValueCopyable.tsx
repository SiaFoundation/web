'use client'

import { Text } from '../core/Text'
import { Button } from '../core/Button'
import { Link } from '../core/Link'
import { CaretDown16, Copy16, Launch16 } from '@siafoundation/react-icons'
import { copyToClipboard } from '../lib/clipboard'
import { stripPrefix } from '../lib/utils'
import {
  EntityType,
  doesEntityHaveSiascanUrl,
  getEntityDisplayLength,
  getEntitySiascanUrl,
  getEntityTypeCopyLabel,
} from '../lib/entityTypes'
import { cx } from 'class-variance-authority'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLeftSlot,
} from '../core/DropdownMenu'

type Props = {
  value: string
  displayValue?: string
  type?: EntityType
  label?: string
  href?: string
  size?: React.ComponentProps<typeof Text>['size']
  weight?: React.ComponentProps<typeof Text>['weight']
  font?: React.ComponentProps<typeof Text>['font']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  maxLength?: number
  color?: React.ComponentProps<typeof Text>['color']
  className?: string
  siascanUrl?: string
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
  font,
  color = 'contrast',
  className,
  siascanUrl,
}: Props) {
  const label = customLabel || getEntityTypeCopyLabel(type)
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
          weight={weight}
          font={font}
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
          font={font}
          ellipsis
        >
          {text}
        </Text>
      )}
      <div className="ml-1 flex items-center">
        <ValueContextMenu
          cleanValue={cleanValue}
          label={label}
          size={size}
          siascanUrl={siascanUrl}
          type={type}
        />
      </div>
    </div>
  )
}

export function ValueContextMenu({
  size,
  cleanValue,
  label,
  siascanUrl,
  type,
}: {
  cleanValue: string
  type?: EntityType
  label?: string
  size?: React.ComponentProps<typeof Text>['size']
  siascanUrl?: string
}) {
  return (
    <DropdownMenu
      trigger={
        <Button size="none" variant="ghost">
          <CaretDown16 className={size === '10' ? 'scale-75' : 'scale-90'} />
        </Button>
      }
      contentProps={{ align: 'end' }}
    >
      <DropdownMenuItem
        onSelect={(e) => {
          copyToClipboard(cleanValue, label)
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Copy to clipboard
      </DropdownMenuItem>
      {siascanUrl && type && doesEntityHaveSiascanUrl(type) && (
        <Link
          target="_blank"
          href={getEntitySiascanUrl(siascanUrl, type, cleanValue)}
          className="block w-full"
          underline="none"
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <DropdownMenuLeftSlot>
              <Launch16 />
            </DropdownMenuLeftSlot>
            View on Siascan
          </DropdownMenuItem>
        </Link>
      )}
    </DropdownMenu>
  )
}
