'use client'

import { Button } from './Button'
import { Text } from './Text'
import { useState, useRef, useEffect } from 'react'
import { cx } from 'class-variance-authority'

type Props = {
  text: string
  maxHeight?: number
  size?: React.ComponentProps<typeof Text>['size']
  color?: React.ComponentProps<typeof Text>['color']
}

export function ExpandableText({
  text,
  maxHeight = 96,
  size = '12',
  color = 'subtle',
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [canExpand, setCanExpand] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setCanExpand(contentRef.current.scrollHeight > maxHeight)
    }
  }, [maxHeight, text])

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <div
          ref={contentRef}
          className="overflow-hidden transition-[max-height] duration-300"
          style={{ maxHeight: !isExpanded ? maxHeight : undefined }}
        >
          <Text size={size} color={color}>
            {text}
          </Text>
        </div>
        {!isExpanded && canExpand && (
          <div
            className={cx(
              'absolute bottom-0 left-0 right-0 h-[48px]',
              'bg-gradient-to-b from-transparent',
              'dark:via-graydark-50/80 dark:to-graydark-50',
              'via-gray-50/80 to-gray-50'
            )}
          />
        )}
      </div>
      {canExpand && (
        <div
          className={cx(
            'flex justify-center',
            isExpanded && 'sticky bottom-2 z-10'
          )}
        >
          <Button
            variant="gray"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
            className={cx(
              isExpanded && 'bg-gray-50 dark:bg-graydark-50',
              isExpanded && 'shadow-md'
            )}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        </div>
      )}
    </div>
  )
}
