import React from 'react'
import { cva, cx, VariantProps } from 'class-variance-authority'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

const styles = cva([])

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  VariantProps<typeof styles> & SeparatorPrimitive.SeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      className={cx(
        'border-b m-0 flex-shrink-0 border-gray-300 dark:border-graydark-300 cursor-default',
        className
      )}
      {...props}
    />
  )
})
