'use client'

import { cx } from 'class-variance-authority'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
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
  color = 'contrast',
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
      'group',
      'cursor-pointer',
      'rounded-sm',
      'focus:outline-none',
      'focus:text-gray-900',
      'dark:focus:text-white',
      'focus:bg-gray-300',
      'dark:focus:bg-graydark-300',
      'aria-selected:bg-gray-400',
      'aria-selected:dark:bg-graydark-500',
      'data-[disabled]:pointer-events-none',
      'data-[disabled]:text-gray-700',
      'dark:data-[disabled]:text-graydark-700',
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

export function MenuSeparator({
  className,
  color,
  ref,
  ...props
}: SeparatorProps & {
  ref?: React.Ref<typeof SeparatorPrimitive.Root>
}) {
  return (
    <Separator ref={ref} className={separatorStyles(className)} {...props} />
  )
}

export function BaseMenuItem({
  className,
  font,
  color,
  weight,
  size = '14',
  scaleSize,
  noWrap,
  ellipsis,
  ref,
  ...props
}: VariantProps<typeof baseItemStyles> &
  React.HTMLAttributes<HTMLDivElement> & {
    ref?: React.RefObject<HTMLDivElement>
  }) {
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

export function MenuItem({
  className,
  font,
  color,
  weight,
  size = '14',
  scaleSize,
  noWrap,
  ellipsis,
  ref,
  ...props
}: VariantProps<typeof itemStyles> &
  React.HTMLAttributes<HTMLDivElement> & {
    ref?: React.RefObject<HTMLDivElement>
  }) {
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

export function MenuItemRightSlot({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  return (
    <div ref={ref} className={cx(['ml-auto', 'pl-5', className])} {...props} />
  )
}
