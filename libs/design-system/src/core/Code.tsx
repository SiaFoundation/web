import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const styles = cva(['font-mono', 'whitespace-nowrap', 'rounded'], {
  variants: {
    color: {
      gray: [
        'bg-gray-200 dark:bg-graydark-200',
        'text-gray-1100 dark:text-graydark-1100',
      ],
      accent: [
        'bg-accent-200 dark:bg-accentdark-200',
        'text-accent-1100 dark:text-accentdark-1100',
      ],
    },
  },
  defaultVariants: {
    color: 'accent',
  },
})

export const Code = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & VariantProps<typeof styles>
>(({ color, className, ...props }, ref) => (
  <code {...props} className={styles({ color, className })} ref={ref} />
))
