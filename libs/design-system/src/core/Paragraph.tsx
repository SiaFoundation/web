import React from 'react'
import { Text } from './Text'
import { cx } from 'class-variance-authority'

type ParagraphSizeVariants = '12' | '14' | '16' | '18' | '20'
type ParagraphProps = Omit<React.ComponentProps<typeof Text>, 'size'> & {
  size?: ParagraphSizeVariants
} & {
  ref?: React.Ref<HTMLParagraphElement>
}

export function Paragraph({ ref, ...props }: ParagraphProps) {
  const { size = '18', ...textProps } = props

  return (
    <Text
      tag="p"
      {...textProps}
      ref={ref}
      weight="regular"
      scaleSize={size}
      color="subtle"
      className={cx('leading-relaxed md:leading-relaxed', props.className)}
    />
  )
}
