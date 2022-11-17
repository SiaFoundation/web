import React from 'react'
import { Text } from './Text'
import { cx, VariantProps } from 'class-variance-authority'

const DEFAULT_TAG = 'h1'

// This is the mapping of Heading to Text size variants
const textTag: Record<HeadingSizeVariants, string> = {
  20: 'h3',
  24: 'h3',
  32: 'h2',
  40: 'h2',
  64: 'h1',
}

const textStyles: Record<HeadingSizeVariants, string> = {
  20: 'font-semibold text-base md:text-xl',
  24: 'font-bold text-xl md:text-2xl',
  32: 'font-semibold text-2xl md:text-3xl',
  40: 'font-semibold text-3xl md:text-4xl',
  64: 'font-semibold text-4xl md:text-6xl',
}

type HeadingSizeVariants = '20' | '24' | '32' | '40' | '64'
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<
  VariantProps<typeof Text>,
  'size'
>
type HeadingProps = React.ComponentProps<typeof DEFAULT_TAG> &
  HeadingVariants & { className?: string; as?: string }

export const Heading = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  HeadingProps
>((props, forwardedRef) => {
  const { size = '24', className, ...textProps } = props

  const tag = textTag[size]

  return (
    <Text
      as={tag}
      {...textProps}
      ref={forwardedRef}
      weight="none"
      className={cx(
        'proportional-nums inline-block',
        textStyles[size],
        className
      )}
    />
  )
})
