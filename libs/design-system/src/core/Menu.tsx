import { cva, cx } from 'class-variance-authority'
import { VariantProps } from '../types'
import { textStyles } from './Text'

export const baseItemStyles = ({
  className,
  ...props
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
    textStyles({ size: '14', ...props }),
    className
  )

export const itemStyles = (className?: string) =>
  cx(
    baseItemStyles(),
    cva([
      'relative',
      'rounded-sm',
      'focus:outline-none',
      // 'focus:ring ring-blue-500 dark:ring-blue-200',
      'focus:text-gray-900',
      'dark:focus:text-white',
      'data-[disabled]:text-gray-500',
      'dark:data-[disabled]:text-gray-100',
    ])({
      className,
    })
  )

export const labelStyles = (className?: string) =>
  cx(
    baseItemStyles({ color: 'subtle' }),
    cva(['font-medium', 'text-gray-700', 'dark:text-gray-100'])({
      className,
    })
  )

export const separatorStyles = (className?: string) =>
  cx(['h-px', 'my-1', 'bg-gray-200', 'dark:bg-gray-700', className])
