import React from 'react'
import { Text } from './Text'
import { VariantProps, CSS } from '../config/theme'

const DEFAULT_TAG = 'p'

type TextSizeVariants = Pick<VariantProps<typeof Text>, 'size'>
type ParagraphSizeVariants = '12' | '14' | '18' | '20'
type ParagraphVariants = { size?: ParagraphSizeVariants } & Omit<
  VariantProps<typeof Text>,
  'size'
>
type ParagraphProps = React.ComponentProps<typeof DEFAULT_TAG> &
  ParagraphVariants & { css?: CSS; as?: string }

export const Paragraph = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  ParagraphProps
>((props, forwardedRef) => {
  const { size = '18', ...textProps } = props

  // This is the mapping of Paragraph Variants to Text variants
  const textSize: Record<ParagraphSizeVariants, TextSizeVariants['size']> = {
    12: { '@initial': '12', '@bp2': '12' },
    14: { '@initial': '14', '@bp2': '14' },
    18: { '@initial': '18', '@bp2': '18' },
    20: { '@initial': '20', '@bp2': '20' },
  }

  // This is the mapping of Paragraph Variants to Text css
  const textCss: Record<ParagraphSizeVariants, CSS> = {
    12: {
      color: '$textSubtle',
      lineHeight: '150%',
      '@bp2': { lineHeight: '150%' },
    },
    14: {
      color: '$textSubtle',
      lineHeight: '150%',
      '@bp2': { lineHeight: '150%' },
    },
    18: {
      color: '$textSubtle',
      lineHeight: '150%',
      '@bp2': { lineHeight: '150%' },
    },
    20: {
      color: '$textSubtle',
      lineHeight: '150%',
      '@bp2': { lineHeight: '150%' },
    },
  }

  return (
    <Text
      as={DEFAULT_TAG}
      {...textProps}
      ref={forwardedRef}
      size={textSize[size]}
      css={{
        ...textCss[size],
        ...props.css,
      }}
    />
  )
})
