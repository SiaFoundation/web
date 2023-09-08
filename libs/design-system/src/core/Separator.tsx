'use client'

import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

const styles = cva(['m-0 flex-shrink-0 cursor-default'], {
  variants: {
    variant: {
      vertical: 'border-r',
      horizontal: 'border-b',
    },
    color: {
      subtle: 'border-gray-300 dark:border-graydark-300',
      verySubtle: 'border-gray-100 dark:border-graydark-100',
      panel: 'border-gray-100 dark:border-graydark-400/50',
    },
  },
  defaultVariants: {
    variant: 'horizontal',
    color: 'subtle',
  },
})

export type SeparatorProps = SeparatorPrimitive.SeparatorProps &
  VariantProps<typeof styles>

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ variant, color, className, ...props }, ref) => {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      className={styles({
        variant,
        color,
        className,
      })}
      {...props}
    />
  )
})
