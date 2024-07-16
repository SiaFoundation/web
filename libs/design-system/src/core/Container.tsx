import { cva } from 'class-variance-authority'
import React from 'react'
import type { VariantProps } from '../types'

const styles = cva(['flex-shrink-0 w-full mx-auto'], {
  variants: {
    pad: {
      true: 'px-5 md:px-10',
      false: '',
    },
    size: {
      '1': 'max-w-screen-sm',
      '2': 'max-w-screen-md',
      '3': 'max-w-[1145px]',
      '4': 'max-w-screen-2xl',
      full: 'max-w-none',
    },
  },
  defaultVariants: {
    pad: true,
    size: '3',
  },
})

export const Container = React.forwardRef<
  HTMLDivElement,
  VariantProps<typeof styles> & React.HTMLAttributes<HTMLDivElement>
>(({ className, pad, size, ...props }, ref) => (
  <div ref={ref} {...props} className={styles({ size, pad, className })} />
))
