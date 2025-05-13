'use client'

import { Text } from '../core/Text'
import { Button } from '../core/Button'
import { Link } from '../core/Link'
import {
  ArrowLeft16,
  ArrowRight16,
  CaretDown16,
  Copy16,
  Launch16,
} from '@siafoundation/react-icons'
import { copyToClipboard } from '../lib/clipboard'
import { stripPrefix } from '../lib/utils'
import {
  EntityType,
  doesEntityHaveSiascanUrl,
  getEntityDisplayLength,
  getEntitySiascanUrl,
  getEntityTypeCopyLabel,
  formatEntityValue,
  defaultFormatValue,
} from '@siafoundation/units'
import { cx } from 'class-variance-authority'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLeftSlot,
} from '../core/DropdownMenu'

import { useState } from 'react'

type Props = {
  labeledBy?: string
  testId?: string
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
  contextMenu?: React.ReactNode
  expandable?: boolean
}

export function ValueCopyable({
  labeledBy,
  testId,
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
  contextMenu,
  expandable = false,
}: Props) {
  const [expanded, setExpanded] = useState(false)

  const label = customLabel || getEntityTypeCopyLabel(type)
  const maxLength = expanded
    ? undefined
    : customMaxLength || (type ? getEntityDisplayLength(type) : 20)
  const cleanValue = stripPrefix(value)
  const renderValue =
    displayValue ||
    (type ? formatEntityValue(type, cleanValue, maxLength) : cleanValue)
  const text = renderValue || defaultFormatValue(cleanValue, maxLength)

  return (
    <div data-testid={testId} className={cx('flex items-center', className)}>
      {href ? (
        <Link
          aria-labelledby={labeledBy}
          href={href}
          underline="hover"
          size={size}
          scaleSize={scaleSize}
          color={color}
          weight={weight}
          font={font}
          ellipsis={!expanded}
          onDoubleClick={(e) => {
            e.preventDefault()
            copyToClipboard(cleanValue, label)
          }}
        >
          {text}
        </Link>
      ) : (
        <Text
          aria-labelledby={labeledBy}
          size={size}
          scaleSize={scaleSize}
          color={color}
          weight={weight}
          font={font}
          ellipsis={!expanded}
          onDoubleClick={() => {
            copyToClipboard(cleanValue, label)
          }}
        >
          {text}
        </Text>
      )}
      <div className="ml-1 flex items-center">
        {contextMenu || (
          <ValueContextMenu
            cleanValue={cleanValue}
            label={label}
            size={size}
            siascanUrl={siascanUrl}
            type={type}
            expandable={
              expandable
                ? {
                    expanded,
                    onExpand: () => setExpanded((expanded) => !expanded),
                  }
                : undefined
            }
          />
        )}
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
  expandable,
}: {
  cleanValue: string
  type?: EntityType
  label?: string
  size?: React.ComponentProps<typeof Text>['size']
  siascanUrl?: string
  expandable?: {
    expanded?: boolean
    onExpand?: () => void
  }
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
      {expandable && (
        <DropdownMenuItem onClick={expandable.onExpand}>
          <DropdownMenuLeftSlot>
            {expandable.expanded ? <ArrowLeft16 /> : <ArrowRight16 />}
          </DropdownMenuLeftSlot>
          {expandable.expanded ? 'Collapse' : 'Expand'}
        </DropdownMenuItem>
      )}
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
