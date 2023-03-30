import { cx } from 'class-variance-authority'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import React from 'react'
import { VariantProps } from '../types'
import { Separator, SeparatorProps } from './Separator'
import { textStyles } from './Text'

export const baseItemStyles = ({
  className,
  font,
  color = 'subtle',
  weight = 'medium',
  size = '14',
  scaleSize,
  noWrap,
  ellipsis,
}: VariantProps<typeof textStyles> = {}) =>
  cx(
    textStyles({
      font,
      color,
      weight,
      size,
      scaleSize,
      noWrap,
      ellipsis,
      className,
    }),
    [
      'relative',
      'flex',
      'items-center',
      'tabular-nums',
      'select-none',
      'whitespace-nowrap',
      'px-1.5',
      'py-1.5',
    ]
  )

export const itemStyles = ({
  className,
  font,
  color = 'subtle',
  weight = 'medium',
  size = '14',
  scaleSize,
  noWrap,
  ellipsis,
}: VariantProps<typeof textStyles> = {}) =>
  cx(
    baseItemStyles({
      font,
      color,
      weight,
      size,
      scaleSize,
      noWrap,
      ellipsis,
      className,
    }),
    [
      'cursor-pointer',
      'rounded-sm',
      'focus:outline-none',
      'focus:text-gray-900',
      'dark:focus:text-white',
      'focus:bg-gray-300',
      'dark:focus:bg-graydark-300',
      'aria-selected:bg-gray-400',
      'aria-selected:dark:bg-graydark-500',
      'data-[disabled]:text-gray-500',
      'dark:data-[disabled]:text-gray-100',
    ]
  )

export const labelStyles = ({
  className,
  font,
  color = 'verySubtle',
  weight = 'medium',
  size = '14',
  scaleSize,
  noWrap,
  ellipsis,
}: VariantProps<typeof textStyles>) =>
  textStyles({
    font,
    color,
    weight,
    size,
    scaleSize,
    noWrap,
    ellipsis,
    className,
  })

export const separatorStyles = (className?: string) =>
  cx(['h-px', 'my-2', 'mx-1.5', className])

export const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, color, ...props }, ref) => {
  return (
    <Separator ref={ref} className={separatorStyles(className)} {...props} />
  )
})

export const BaseMenuItem = React.forwardRef<
  HTMLDivElement,
  VariantProps<typeof baseItemStyles> & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      font,
      color,
      weight,
      size = '14',
      scaleSize,
      noWrap,
      ellipsis,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cx(
          baseItemStyles({
            className,
            font,
            color,
            weight,
            size,
            scaleSize,
            noWrap,
            ellipsis,
          })
        )}
        {...props}
      />
    )
  }
)

export const MenuItem = React.forwardRef<
  HTMLDivElement,
  VariantProps<typeof itemStyles> & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      font,
      color,
      weight,
      size = '14',
      scaleSize,
      noWrap,
      ellipsis,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cx(
          itemStyles({
            className,
            font,
            color,
            weight,
            size,
            scaleSize,
            noWrap,
            ellipsis,
          })
        )}
        {...props}
      />
    )
  }
)

export const MenuItemRightSlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cx(['ml-auto', 'pl-5', className])} {...props} />
  )
})
