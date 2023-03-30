import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

const styles = cva(['border-b m-0 flex-shrink-0 cursor-default'], {
  variants: {
    color: {
      subtle: 'border-gray-300 dark:border-graydark-300',
      verySubtle: 'border-gray-100 dark:border-graydark-100',
    },
  },
  defaultVariants: {
    color: 'subtle',
  },
})

export type SeparatorProps = SeparatorPrimitive.SeparatorProps &
  VariantProps<typeof styles>

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ color, className, ...props }, ref) => {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      className={styles({
        color,
        className,
      })}
      {...props}
    />
  )
})
