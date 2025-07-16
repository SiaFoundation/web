'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import { textStyles } from './Text'
import { VariantProps } from '../types'
import { labelStyles } from './Menu'

type Props = VariantProps<typeof textStyles> &
  LabelPrimitive.LabelProps & {
    ref?: React.RefObject<HTMLLabelElement>
  }

export function Label({
  ref,
  font,
  size = '14',
  scaleSize,
  weight,
  color = 'verySubtle',
  noWrap,
  ellipsis,
  className,
  ...props
}: Props) {
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
}
