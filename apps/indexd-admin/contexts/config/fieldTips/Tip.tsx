import { Button, Text, Tooltip } from '@siafoundation/design-system'
import React from 'react'

export function TipAction({
  children,
  tip,
  icon,
  iconColor,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  iconColor?: React.ComponentProps<typeof Text>['color']
  tip?: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <Tooltip align="end" content={tip}>
      <div className="flex gap-1 items-center relative p-1 -m-1 overflow-hidden">
        <Text color={iconColor} className="flex relative">
          {icon}
        </Text>
        <Button
          size="small"
          onClick={onClick}
          disabled={disabled}
          className="flex-1"
        >
          {children}
        </Button>
      </div>
    </Tooltip>
  )
}

export function TipReadOnly({
  children,
  tip,
  icon,
  iconColor,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  iconColor?: React.ComponentProps<typeof Text>['color']
  tip?: React.ReactNode
}) {
  return (
    <Tooltip align="end" content={tip}>
      <div className="flex gap-1 items-center relative overflow-hidden">
        <Text color={iconColor} className="flex relative">
          {icon}
        </Text>
        {children}
      </div>
    </Tooltip>
  )
}
