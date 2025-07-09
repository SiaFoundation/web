import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const styles = cva(['rounded-full flex-shrink-0'], {
  variants: {
    size: {
      default: 'w-2 h-2',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

type Props = VariantProps<typeof styles> &
  React.HTMLAttributes<HTMLDivElement> & {
    ref?: React.Ref<HTMLDivElement>
  }

export function Status({ size, className, ref, ...props }: Props) {
  return <div ref={ref} className={styles({ size, className })} {...props} />
}
