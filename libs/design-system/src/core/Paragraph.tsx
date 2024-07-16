import { cx } from 'class-variance-authority'
import React from 'react'
import { Text } from './Text'

type ParagraphSizeVariants = '12' | '14' | '16' | '18' | '20'
type ParagraphProps = Omit<React.ComponentProps<typeof Text>, 'size'> & {
  size?: ParagraphSizeVariants
}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, forwardedRef) => {
    const { size = '18', ...textProps } = props

    return (
      <Text
        tag="p"
        {...textProps}
        ref={forwardedRef}
        weight="regular"
        scaleSize={size}
        color="subtle"
        className={cx('leading-relaxed md:leading-relaxed', props.className)}
      />
    )
  },
)
