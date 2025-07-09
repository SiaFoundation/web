import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

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
    ellipsis: {
      true: 'overflow-hidden text-ellipsis whitespace-nowrap',
    },
  },
  defaultVariants: {
    color: 'accent',
    ellipsis: false,
  },
})

export function Code({
  ref,
  color,
  className,
  ellipsis,
  ...props
}: React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof styles> & {
    ref?: React.RefObject<HTMLElement>
  }) {
  return (
    <code
      {...props}
      className={styles({ color, ellipsis, className })}
      ref={ref}
    />
  )
}
