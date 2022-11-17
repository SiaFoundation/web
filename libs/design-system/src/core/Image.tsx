import NextImage from 'next/image'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const styles = cva(['rounded'])

type Props = React.ComponentProps<typeof NextImage> &
  VariantProps<typeof styles>

export function Image({ className, ...props }: Props) {
  return <NextImage className={styles({ className })} {...props} />
}
