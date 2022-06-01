import React from 'react'
import { Text } from './Text'
import { VariantProps, CSS } from '../config/theme'

const DEFAULT_TAG = 'h1'

// This is the mapping of Heading to Text size variants
const textSize: Record<HeadingSizeVariants, TextSizeVariants['size']> = {
  20: { '@initial': '16', '@bp2': '20' },
  24: { '@initial': '20', '@bp2': '24' },
  32: { '@initial': '24', '@bp2': '32' },
  64: { '@initial': '40', '@bp2': '64' },
}

// This is the mapping of Heading to Text size variants
const textTag: Record<HeadingSizeVariants, string> = {
  20: 'h3',
  24: 'h3',
  32: 'h2',
  64: 'h1',
}

// This is the mapping of Heading Variants to Text css
const textCss: Record<HeadingSizeVariants, CSS> = {
  20: {
    fontWeight: 700,
    lineHeight: '$sizes$3',
    letterSpacing: '-1%',
    '@bp2': { lineHeight: '$sizes$3' },
  },
  24: {
    fontWeight: 700,
    lineHeight: '$sizes$3',
    letterSpacing: '-1%',
    '@bp2': { lineHeight: '$sizes$3' },
  },
  32: {
    fontWeight: 600,
    lineHeight: '110%',
    letterSpacing: '-1%',
    '@bp2': { lineHeight: '110%' },
  },
  64: {
    fontWeight: 600,
    lineHeight: '110%',
    letterSpacing: '-1%',
    '@bp2': { lineHeight: '110%' },
  },
}

type TextSizeVariants = Pick<VariantProps<typeof Text>, 'size'>
type HeadingSizeVariants = '20' | '24' | '32' | '64'
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<
  VariantProps<typeof Text>,
  'size'
>
type HeadingProps = React.ComponentProps<typeof DEFAULT_TAG> &
  HeadingVariants & { css?: CSS; as?: string }

export const Heading = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  HeadingProps
>((props, forwardedRef) => {
  const { size = '24', ...textProps } = props

  const tag = textTag[size]

  return (
    <Text
      as={tag}
      {...textProps}
      ref={forwardedRef}
      size={textSize[size]}
      css={{
        fontVariantNumeric: 'proportional-nums',
        display: 'inline-block',
        ...textCss[size],
        ...props.css,
      }}
    />
  )
})
