import { cx } from 'class-variance-authority'
import { VariantProps } from '../types'
import { textStyles } from './Text'

export const baseItemStyles = ({
  className,
  font,
  color,
  weight,
  size = '14',
  scaleSize,
  noWrap,
  ellipsis,
}: VariantProps<typeof textStyles> = {}) =>
  cx(
    [
      'flex',
      'items-center',
      // 'justify-center',
      'tabular-nums',
      'cursor-pointer',
      'select-none',
      'whitespace-nowrap',
      // 'h-4',
      'px-1.5',
      'py-1.5',
    ],
    textStyles({ font, color, weight, size, scaleSize, noWrap, ellipsis }),
    className
  )

export const itemStyles = (className?: string) =>
  cx(
    baseItemStyles(),
    [
      'relative',
      'rounded-sm',
      'focus:outline-none',
      // 'focus:ring ring-blue-500 dark:ring-blue-200',
      'focus:text-gray-900',
      'dark:focus:text-white',
      'active:bg-gray-300',
      'dark:active:bg-graydark-300',
      'aria-selected:bg-gray-400',
      'aria-selected:dark:bg-graydark-500',
      'data-[disabled]:text-gray-500',
      'dark:data-[disabled]:text-gray-100',
    ],
    className
  )

export const labelStyles = ({
  className,
  font,
  color = 'subtle',
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
  cx(['h-px', 'my-1', 'bg-gray-200', 'dark:bg-graydark-400', className])
