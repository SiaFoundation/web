import NextImage from 'next/image'
import { cva } from 'class-variance-authority'
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
