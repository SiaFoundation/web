import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

const styles = cva([
  'border-none m-0 flex-shrink-0 bg-gray-300 dark:bg-graydark-300 cursor-default',
])

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  VariantProps<typeof styles> & SeparatorPrimitive.SeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      className={styles({ className })}
      {...props}
    />
  )
})
