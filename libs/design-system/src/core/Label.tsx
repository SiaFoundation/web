import * as LabelPrimitive from '@radix-ui/react-label'
import React from 'react'
import { textStyles } from './Text'
import { VariantProps } from '../types'

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  VariantProps<typeof textStyles> & LabelPrimitive.LabelProps
>(
  (
    {
      font,
      size,
      scaleSize,
      weight,
      color = 'subtle',
      noWrap,
      ellipsis,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        {...props}
        className={textStyles({
          font,
          size,
          scaleSize,
          color,
          weight,
          noWrap,
          ellipsis,
          className,
        })}
      />
    )
  }
)
