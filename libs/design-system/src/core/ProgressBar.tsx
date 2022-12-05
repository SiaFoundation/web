import React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { Text } from './Text'
import { cva } from 'class-variance-authority'
import { VariantProps } from '../types'

const styles = cva(['relative h-1 w-full overflow-hidden rounded-lg'], {
  variants: {
    variant: {
      gray: 'bg-gray-700 dark:bg-graydark-700',
      accent: 'bg-green-600 dark:bg-green-500',
    },
  },
  defaultVariants: {
    variant: 'gray',
  },
})

export const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  VariantProps<typeof styles> &
    ProgressPrimitive.ProgressProps & { label?: string }
>(({ label, variant, className, value, max = 100, ...props }, forwardedRef) => {
  const percentage = value != null ? Math.round((value / max) * 100) : null

  return (
    <div className="flex flex-col gap-1 w-full">
      <ProgressPrimitive.Root
        {...props}
        ref={forwardedRef}
        value={value}
        max={max}
        className={styles({ variant, className })}
      >
        <ProgressPrimitive.Indicator
          className="absolute top-0 right-0 left-0 bottom-0 w-full bg-gray-300 dark:bg-graydark-300 transition-transform"
          style={{ transform: `translateX(${percentage}%)` }}
        />
      </ProgressPrimitive.Root>
      {label && (
        <Text color="subtle" size="12" ellipsis>
          {label}
        </Text>
      )}
    </div>
  )
})
