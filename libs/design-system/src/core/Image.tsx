import { Image as NextImage } from '@siafoundation/next'
import { cva } from 'class-variance-authority'
import React from 'react'
import { VariantProps } from '../types'

const styles = cva([], {
  variants: {
    rounded: {
      true: 'rounded',
    },
  },
  defaultVariants: {
    rounded: true,
  },
})

type Props = VariantProps<typeof styles> &
  React.ComponentProps<typeof NextImage>

export function Image({ className, rounded, ...props }: Props) {
  return <NextImage className={styles({ className, rounded })} {...props} />
}
