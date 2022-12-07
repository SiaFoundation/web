import NextImage from 'next/image'
import { cva } from 'class-variance-authority'
import React from 'react'
import { VariantProps } from '../types'

const styles = cva(['rounded'])

type Props = VariantProps<typeof styles> &
  React.ComponentProps<typeof NextImage>

export function Image({ className, ...props }: Props) {
  return <NextImage className={styles({ className })} {...props} />
}
