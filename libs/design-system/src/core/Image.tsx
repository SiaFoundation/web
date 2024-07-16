import { Image as NextImage } from '@siafoundation/next'
import { cva } from 'class-variance-authority'
import type React from 'react'
import type { VariantProps } from '../types'

const styles = cva(['rounded'])

type Props = VariantProps<typeof styles> &
  React.ComponentProps<typeof NextImage>

export function Image({ className, ...props }: Props) {
  return <NextImage className={styles({ className })} {...props} />
}
