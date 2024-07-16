'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import React from 'react'
import type { VariantProps } from '../types'
import { labelStyles } from './Menu'
import type { textStyles } from './Text'

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  VariantProps<typeof textStyles> & LabelPrimitive.LabelProps
>(
  (
    {
      font,
      size = '14',
      scaleSize,
      weight,
      color = 'verySubtle',
      noWrap,
      ellipsis,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        {...props}
        className={labelStyles({
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
  },
)
